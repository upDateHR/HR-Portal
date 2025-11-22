import React from "react";
import CardGrid from "./Intern/CardGrid";

export default function InternHome() {
  return (
    <>
      <main className=" bg-gradient-to-b from-slate-50 to-white text-slate-900">
        <section className="max-w-7xl mx-auto px-10 py-2 lg:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center">
            {/* Left: Headline + CTA */}
            <div className="lg:col-span-6">
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                Your <span className="text-indigo-600">future</span> starts here
                <br />
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-xl">
                35k+ Internships for freshers, students & graduates!
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#explore"
                  className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-6 py-3 shadow-lg hover:from-indigo-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 text-lg font-medium"
                >
                  Find Internships
                </a>

                {/* Employer-only CTA removed: Post Internships */}
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
        <div className="mb-10">
          <CardGrid />

          
        </div>
      </main>
    </>
  );
}
