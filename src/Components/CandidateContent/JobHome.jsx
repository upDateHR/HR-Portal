import React from "react";
import JobCardGrid from "./Job/JobCardGrid";

export default function JobHome() {
  return (
    <>
      <main className=" bg-gradient-to-b from-slate-50 to-white text-slate-900">
        <section className="max-w-7xl mx-auto px-10 py-2 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center">
            {/* Left: Headline + CTA */}
            <div className="lg:col-span-6">
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                Your <span className="text-indigo-600">future</span> starts here
                <br />
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-xl">
                12k+ Jobs for freshers, students & graduates!
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#explore"
                  className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-4 py-2 shadow-lg hover:from-indigo-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 text-sm font-medium"
                >
                  Find Jobs
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-6 py-3 text-black bg-white hover:bg-slate-50"
                >
                  Post Jobs
                </a>
              </div>
            </div>

            {/* Right: Visuals */}
            <div className="lg:col-span-6">
              <div className="">
                <div className="">
                  <div className="">
                    <img
                      src="https://d8it4huxumps7.cloudfront.net/uploads/images/676e5f765e786_internship_portal.png?d=1000x600"
                      alt="Students collaborating"
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  */}
        <div>
          <section className="max-w-7xl flex justify-center  mx-auto px-6 py-8 lg:py-2">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="text-center lg:text-left">
                <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                  Jobs
                </h2>
                <p className="text-lg text-slate-600 mt-1">Categories</p>
              </div>

              <div className="w-full">
                {/* horizontally scrollable on small screens, wraps on larger */}
                <ul className="flex gap-4 items-center overflow-x-auto lg:flex-wrap lg:overflow-visible py-2">
                  {[
                    { emoji: "🌍", label: "Human Resources" },
                    { emoji: "💻", label: "Software Development" },
                    { emoji: "📢", label: "Marketing" },
                    { emoji: "⚙️", label: "Operations" },
                    { emoji: "💰", label: "Finance" },
                    { emoji: "🎨", label: "UI Design" },
                  ].map((item) => (
                    <li key={item.label} className="flex-shrink-0">
                      <button
                        type="button"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        aria-label={item.label}
                      >
                        <span className="flex h-10 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 text-lg">
                          {item.emoji}
                        </span>
                        <span className="text-sm font-medium text-slate-800 whitespace-nowrap">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

         
          <JobCardGrid />
          
          {/*  */}
          <section className="max-w-7xl mx-auto px-10 pb-16 pt-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 rounded-xl shadow-lg border border-slate-100 ">
            {/* Left Image */}
            <div className=" flex justify-center">
              <img
                src="/Skills.png"
                alt="Skills"
                className=" h-60 rounded-xl"
              />
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                Learn & Level Up Your Skills
              </h1>

              <p className="text-lg text-slate-600">
                Select from a wide range of courses to upskill and advance your
                career!
              </p>

              <button className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 focus:outline-none focus:ring-4  text-white rounded-xl shadow-md transition font-medium">
                Explore Courses
              </button>
            </div>
          </div>
        </section>
        </div>
      </main>
    </>
  );
}
