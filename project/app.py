from flask import Flask, render_template, request, redirect, send_file
import pdfplumber
import docx
import re
import json
import tempfile
import os
import io
from uuid import uuid4
from datetime import datetime

app = Flask(__name__)

# Results directory
RESULTS_DIR = r"C:\Users\Seratul Mustakim\Desktop\New folder (2)\project\Results_saved"
os.makedirs(RESULTS_DIR, exist_ok=True)

# --- REGEX ---
EMAIL_RE = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")
PHONE_RE = re.compile(r"\b\d{10}\b")
YEAR_RE = re.compile(r"\b(?:19|20)\d{2}\b")

DEFAULT_KEYWORDS = [
    "python", "java", "c", "c++", "sql",
    "machine learning", "deep learning", "nlp",
    "teamwork", "leadership", "communication"
]

def format_analysis_to_text(data, rid=None):
    """Turn the analysis dict into a readable plain-text report."""
    lines = []
    lines.append("ATS Resume Report")
    # Indian Standard Time (IST) is UTC+5:30
    from datetime import timedelta
    ist_time = datetime.utcnow() + timedelta(hours=5, minutes=30)
    lines.append(f"Generated: {ist_time.strftime('%Y-%m-%d %H:%M:%S')} IST")
    lines.append("-" * 40)

    # Core scores & counts
    lines.append(f"Overall Score: {data.get('score', 'N/A')}%")
    lines.append(f"JD Match Score: {data.get('jd_score', 'N/A')}%")
    lines.append(f"Word Count: {data.get('word_count', 'N/A')}")
    lines.append("")

    # Contacts
    emails = data.get('emails', [])
    phones = data.get('phones', [])
    lines.append("Contact information found:")
    lines.append("  Emails: " + (", ".join(emails) if emails else "None found"))
    lines.append("  Phone numbers: " + (", ".join(phones) if phones else "None found"))
    lines.append("")

    # Keywords and matches
    found = data.get('found_keywords', [])
    lines.append("Keywords found in resume:")
    lines.append("  " + (", ".join(found) if found else "None of the default keywords were detected"))
    lines.append("")

    jd_matches = data.get('jd_matches', [])
    lines.append("Sample JD matches (common words between JD and resume):")
    lines.append("  " + (", ".join(jd_matches) if jd_matches else "No matches found or JD not provided"))
    lines.append("")

    # Recommendations
    recs = data.get('recommendations', [])
    lines.append("Recommendations:")
    if recs:
        for i, r in enumerate(recs, 1):
            lines.append(f"  {i}. {r}")
    else:
        lines.append("  No specific recommendations. Good job!")
    lines.append("")

    # Optional: other fields if present
    other_keys = ['detected_sections']
    for k in other_keys:
        if k in data:
            val = data.get(k)
            lines.append(f"{k.replace('_',' ').title()}:")
            if isinstance(val, (list, tuple)):
                lines.append("  " + (", ".join(val) if val else "None"))
            else:
                lines.append(f"  {val}")
            lines.append("")

    lines.append("-" * 40)
    lines.append("Note: This report was automatically generated to be easy to read. It is NOT the original resume text.")
    return "\n".join(lines)


def simple_tokenize(text):
    return re.findall(r"\w+", text)

def extract_pdf(path):
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            t = page.extract_text()
            if t:
                text += t + "\n"
    return text

def extract_docx(path):
    doc = docx.Document(path)
    return "\n".join(p.text for p in doc.paragraphs)

def analyze_resume(text, jd):
    score = 50
    words = simple_tokenize(text)
    wcount = len(words)
    recs = []

    if wcount < 200:
        score -= 10
        recs.append("Resume is too short.")
    elif wcount > 900:
        score -= 10
        recs.append("Resume is too long.")

    found_keywords = [k for k in DEFAULT_KEYWORDS if k.lower() in text.lower()]
    score += len(found_keywords) * 2

    emails = EMAIL_RE.findall(text)
    phones = PHONE_RE.findall(text)

    if not emails:
        recs.append("Add an email to your resume.")
        score -= 5

    if not phones:
        recs.append("Add a phone number.")
        score -= 5

    jd_score = 0
    jd_matches = []
    if jd.strip():
        jd_words = set(simple_tokenize(jd.lower()))
        resume_words = set(simple_tokenize(text.lower()))
        jd_matches = list(jd_words & resume_words)
        if jd_matches:
            jd_score = int(len(jd_matches) / len(jd_words) * 100)
            score = int(score * 0.7 + jd_score * 0.3)

    return {
        "score": score,
        "word_count": wcount,
        "jd_score": jd_score,
        "jd_matches": jd_matches[:20],
        "emails": emails,
        "phones": phones,
        "found_keywords": found_keywords,
        "recommendations": recs
    }


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    file = request.files["resume"]
    jd = request.form.get("jd", "")

    # Save temp
    ext = file.filename.split(".")[-1]
    tfile = tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}")
    file.save(tfile.name)

    if ext.lower() == "pdf":
        text = extract_pdf(tfile.name)
    else:
        text = extract_docx(tfile.name)

    analysis = analyze_resume(text, jd)

    report_id = str(uuid4())
    json_path = os.path.join(RESULTS_DIR, f"{report_id}.json")

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(analysis, f, indent=2)

    return render_template("result.html", data=analysis, report_id=report_id, text=text)

@app.route("/download/<rid>")
def download(rid):
    """
    Serve a neat text (TXT) report generated from the saved JSON.
    The JSON file is still kept on disk (auto-save unchanged).
    """
    json_path = os.path.join(RESULTS_DIR, f"{rid}.json")
    if not os.path.exists(json_path):
        return "Report not found", 404

    # Load the saved JSON analysis
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Convert to friendly text
    text_report = format_analysis_to_text(data)

    # Stream the text as a downloadable .txt file (no temp file required)
    buf = io.BytesIO()
    buf.write(text_report.encode("utf-8"))
    buf.seek(0)
    # Flask >= 2.0 uses download_name
    return send_file(
        buf,
        as_attachment=True,
        download_name=f"ats_report_{rid}.txt",
        mimetype="text/plain",
    )


if __name__ == "__main__":
    app.run(debug=True)
