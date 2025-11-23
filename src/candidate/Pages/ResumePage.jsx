import React from "react";
import { Link } from "react-router-dom";
import ResumeBuilder from "./ResumeBuilder";

const ResumePage = () => {
  return (
    <>
      <main className="min-h-150 bg-[#F1FAFF] text-slate-900">
        <section className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
          {/* Heading */}
          <header className="text-start mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Free Online <span className="text-purple-600">Resume Maker</span>
            </h1>
            <h3 className="mt-3 text-base sm:text-lg text-slate-600">
              Personalized resume builder and analyzer to help you stand out.
            </h3>
          </header>

          {/* Hero Content */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h2 className="text-2xl  sm:text-3xl font-bold">
                Create your resume in minutes
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Create a beautiful, job-ready resume quickly with the help of
                AI. Customize sections, optimize content, and download in one
                click.
              </p>

              <ul className="space-y-2 text-sm text-slate-700">
                <li>✅ AI-assisted content suggestions</li>
                <li>✅ ATS-friendly formatting</li>
                <li>✅ Perfect for freshers & interns</li>
              </ul>

              <Link to="/candidate/resumebuilder">
                <button className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-500 text-white px-6 py-3 text-sm sm:text-base font-semibold shadow-lg hover:from-purple-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all">
                  Create resume
                </button>
              </Link>

              
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                className="max-h-82 px-20 pt-10 w-auto rounded-xl bg-[#DCF1FF]"
                src="https://internshala.com//static/images/resume_maker/how_it_works/step_1.png"
                alt="Resume builder preview"
              />
            </div>
          </div>
        </section>
        
      </main>
      
    </>
  );
};

export default ResumePage;
