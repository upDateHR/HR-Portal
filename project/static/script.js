document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Index page interactions ---------- */
  const drop = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const spinner = document.getElementById("spinner");
  const previewArea = document.getElementById("previewArea");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const uploadNotice = document.getElementById("uploadNotice");
  const fileNameEl = document.getElementById("fileName");
  const dropText = document.getElementById("dropText");

  if (drop) {
    drop.addEventListener("click", () => fileInput.click());
    drop.addEventListener("dragover", (e) => {
      e.preventDefault();
      drop.style.borderColor = "rgba(6,95,95,0.12)";
      drop.style.transform = "translateY(-4px)";
    });
    drop.addEventListener("dragleave", (e) => {
      drop.style.borderColor = "rgba(6,95,95,0.08)";
      drop.style.transform = "none";
    });
    drop.addEventListener("drop", (e) => {
      e.preventDefault();
      drop.style.borderColor = "rgba(6,95,95,0.08)";
      drop.style.transform = "none";
      if (e.dataTransfer.files.length) fileInput.files = e.dataTransfer.files;
      updateAfterSelect();
    });
  }

  function humanSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return ((bytes / 1024) | 0) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  function updateAfterSelect() {
    const f = fileInput.files[0];
    if (!f) {
      analyzeBtn.disabled = true;
      if (uploadNotice) uploadNotice.classList.add("hidden");
      previewArea.textContent = "No analysis yet.";
      dropText.textContent = "Drop file here or click to browse";
      return;
    }
    fileNameEl.textContent = f.name;
    previewArea.innerHTML = `<strong>Selected:</strong> ${f.name} • ${humanSize(
      f.size
    )}`;
    analyzeBtn.disabled = false;
    if (uploadNotice) uploadNotice.classList.remove("hidden");
    dropText.textContent = "File ready — click Analyze";
  }

  if (fileInput) {
    fileInput.addEventListener("change", updateAfterSelect);
  }

  // spinner on submit
  const form = document.getElementById("uploadForm");
  if (form) {
    form.addEventListener("submit", (ev) => {
      analyzeBtn.disabled = true;
      spinner.classList.remove("hidden");
    });
  }

  // reset
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (fileInput) fileInput.value = "";
      const jd = document.getElementById("jd");
      if (jd) jd.value = "";
      if (uploadNotice) uploadNotice.classList.add("hidden");
      previewArea.textContent = "No analysis yet.";
      analyzeBtn.disabled = true;
      dropText.textContent = "Drop file here or click to browse";
    });
  }

  /* ---------- Result page interactions ---------- */
  // copy recommendations
  const copyBtn = document.getElementById("copyRec");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const nodes = document.querySelectorAll(".rec-item");
      const text = Array.from(nodes)
        .map((n) => n.innerText.trim())
        .join("\n");
      if (!text) return alert("No recommendations found to copy.");
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = "Copied ✓";
        setTimeout(() => (copyBtn.textContent = "Copy Recommendations"), 1200);
      });
    });
  }

  // toggle parsed text block
  const toggleParsed = document.getElementById("toggleParsed");
  if (toggleParsed) {
    toggleParsed.addEventListener("click", () => {
      const block = document.getElementById("parsedBlock");
      if (!block) return;
      block.classList.toggle("hidden");
      block.scrollIntoView({ behavior: "smooth" });
    });
  }
});
