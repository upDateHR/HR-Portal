import React from "react";
import "./HomePage.css";
import Footer from "./Footer";

// HomePage - improved design using Tailwind CSS
// Notes:
// 1) This component assumes Tailwind is configured in your project.
// 2) Replace placeholder image URLs with your own assets or an <Image/> component if using Next.js.
// 3) Accessible, responsive layout with a simple card grid and CTA buttons.

export default function HomePage() {
  return (
    <>
      <main className=" bg-gradient-to-b from-slate-50 to-white text-slate-900">
        <section className="max-w-7xl mx-auto px-10 py-2 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center">
            {/* Left: Headline + CTA */}
            <div className="lg:col-span-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight">
                Unlock your career —{" "} <br />
                <span className="text-indigo-600">get noticed</span> and get
                hired
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-xl">
                Explore curated opportunities from top companies worldwide. Grow
                skills, earn CV points, build a portfolio and land your dream
                role — all in one place.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#explore"
                  className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-4 py-2 shadow-lg hover:from-indigo-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 text-sm font-medium"
                >
                  Explore Opportunities
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-6 py-3 text-slate-700 bg-white hover:bg-slate-50"
                >
                  How it works
                </a>
              </div>

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md">
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 font-semibold">
                    ★
                  </span>
                  <div>
                    <div className="text-sm font-medium">CV points</div>
                    <div className="text-xs text-slate-500">
                      Earn verified achievements
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 font-semibold">
                    ⚡
                  </span>
                  <div>
                    <div className="text-sm font-medium">Real projects</div>
                    <div className="text-xs text-slate-500">
                      Work with companies
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 font-semibold">
                    🌍
                  </span>
                  <div>
                    <div className="text-sm font-medium">Global roles</div>
                    <div className="text-xs text-slate-500">
                      Remote & onsite
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right: Visuals */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-white to-slate-50">
                <div className="grid grid-cols-2 gap-4 p-6">
                  <div className="rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop"
                      alt="Students collaborating"
                      className="w-full h-38 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold">Projects & Challenges</h3>
                      <p className="text-sm text-slate-500">
                        Hands-on tasks that companies love.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80&auto=format&fit=crop"
                      alt="Person coding"
                      className="w-full h-38 object-cover"
                    />
                    <div className="p-2">
                      <h3 className="font-semibold">Mentorship</h3>
                      <p className="text-sm text-slate-500">
                        Grow with feedback from industry pros.
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2 rounded-xl overflow-hidden bg-gradient-to-r from-indigo-600/10 to-transparent p-6 flex items-center gap-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">
                        Featured Company
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Work with top startups looking for talent like you.
                      </p>
                    </div>
                    <div className="w-24 h-24 rounded-lg bg-white/60 flex items-center justify-center text-indigo-600 font-bold">
                      IamHR
                    </div>
                  </div>
                </div>

                {/* subtle bottom bar */}
                <div className="absolute inset-x-0 bottom-0 p-4 border-t border-slate-100 bg-white/60 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div>Trusted by 500+ companies</div>
                    <div className="flex items-center gap-3">
                      <div className="px-2 py-1 rounded-md bg-slate-50 text-slate-700">
                        Top roles
                      </div>
                      <div className="px-2 py-1 rounded-md bg-slate-50 text-slate-700">
                        Internships
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-10 py-12">
          <div>
            <h2 className="text-1xl flex items-start font-bold text-slate-900 text-center mb-2">
              Who's using IamHR?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-center gap-4 bg-white shadow-sm p-5 rounded-xl border border-slate-100">
                <img
                  src="/Students.png"
                  alt=""
                  className="w-14 h-14 object-contain"
                />
                <div>
                  <h3 className="text font-semibold">
                    Students & Professionals
                  </h3>
                  <p className=" text-xs">
                    Unlock Your Potential: Compete, Build Resume, Grow and get
                    Hired!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white shadow-sm p-5 rounded-xl border border-slate-100">
                <img
                  src="/Companies.png"
                  alt=""
                  className="w-14 h-14 object-contain"
                />

                <div>
                  <h3 className="text font-semibold">
                    HR Managers & Recruiters
                  </h3>
                  <p className=" text-xs">
                    Unlock Your Potential: Compete, Build Resume, Grow and get
                    Hired!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white shadow-sm p-5 rounded-xl border border-slate-100">
                <img
                  src="/Academia.png"
                  alt=""
                  className="w-14 h-14 object-contain"
                />

                <div>
                  <h3 className="text font-semibold">
                    Founders & Hiring Teams
                  </h3>
                  <p className=" text-xs">
                    Unlock Your Potential: Compete, Build Resume, Grow and get
                    Hired!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-10 py-16">
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

        <Footer />
      </main>
    </>
  );
}
