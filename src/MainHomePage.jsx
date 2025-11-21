import React from "react";
import { Link } from "react-router-dom";

const MainHomePage = () => {
  const courses = [
    {
      title: "Web Development",
      img: "https://internshala.com/static/images/home/trainings/images/web_development.png",
      duration: "8 Weeks",
      rating: 4.1,
      learner: 1273,
    },
    {
      title: "Artificial Intelligence & Machine Learning",
      img: "https://internshala.com/static/images/home/trainings/images/artificial-intelligence-and-machine-learning.png",
      duration: "8 Weeks",
      rating: 3.9,
      learner: 813,
    },
    {
      title: "Data Science",
      img: "https://internshala.com/static/images/home/trainings/images/data_science.png",
      duration: "6 Weeks",
      rating: 4.1,
      learner: 193,
    },
    {
      title: "Programming with Python with AI",
      img: "https://internshala.com/static/images/home/trainings/images/python.png",
      duration: "6 Weeks",
      rating: 4.3,
      learner: 173,
    },
  ];
  return (
    <>
      <main className=" bg-gradient-to-b from-slate-50 to-white text-slate-900">
        {/* Section 1 */}
        <section className="max-w-7xl mx-auto px-10 py-2 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center">
            {/* Left: Headline + CTA */}
            <div className="lg:col-span-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight">
                <span className="text-indigo-600 sm:text-5xl">Unlock </span>
                Opportunity — Internships & Talent Hiring
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-xl">
                Join our internship platform where students explore real
                opportunities and companies discover skilled candidates ready to
                grow.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center rounded-2xl  px-6 py-3 text-slate-700 bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-4 py-3 shadow-lg hover:from-indigo-700 hover:to-violet-600 focus:outline-none focus:ring-4 "
                  >
                    Explore Opportunities
                  </a>
                </Link>

                <Link to="/login">
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-6 py-3 text-slate-700 bg-white hover:bg-slate-50"
                  >
                    How it works
                  </a>
                </Link>
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

        {/* Section 2 */}
        <div>
          <section className="max-w-7xl flex justify-center  mx-auto px-6 py-8 lg:py-2">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="text-center lg:text-left">
                <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                  Internships
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

          {/* section 3 */}
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
                  Select from a wide range of courses to upskill and advance
                  your career!
                </p>

                <Link to="/signup">
                  <button className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 focus:outline-none focus:ring-4  text-white rounded-xl shadow-md transition font-medium">
                    Explore Skills
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="max-w-7xl mx-auto px-10 py-10 ">
            <div className="">
              <div className="space-y-8 ">
                <h1 className="text-3xl font-bold text-slate-900">
                  Popular certification courses
                </h1>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                  {courses.map((course, idx) => (
                    <div
                      key={idx}
                      className="w-full max-w-xs rounded-2xl shadow-md border border-slate-200 bg-white flex flex-col"
                    >
                      <img
                        src={course.img}
                        alt={course.title}
                        className="w-full h-auto rounded-t-[15px]"
                      />

                      {/* Content area with flex-grow */}
                      <div className="p-5 space-y-2 flex flex-col flex-grow">
                        <p className="text-sm font-medium text-slate-500">
                          {course.duration}
                        </p>

                        <h2 className="text-[18px] font-semibold text-slate-700 leading-tight">
                          {course.title}
                        </h2>

                        <p className="text-sm font-medium text-slate-800">
                          ⭐ {course.rating} | {course.learner} learners
                        </p>

                        {/* Push button to bottom */}
                        <div className="mt-auto">
                          <Link to="/signup">
                            <a
                              href="#explore"
                              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-4 py-2 shadow-lg hover:from-indigo-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 text-sm font-medium transition-all"
                            >
                              Know more
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="max-w-7xl mx-auto px-10 py-10 ">
            <div className="flex flex-col lg:flex-row items-center gap-12 rounded-2xl shadow-xl border border-slate-200 p-8 bg-white/60 backdrop-blur bg-[url('https://internshala.com/static/images/homepage/resume_builder_v1/r1920.webp')] bg-contain bg-right bg-no-repeat">
              <div className="space-y-2 ">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                  No resume? No problem.
                </h1>
                <p className="text-lg  font-medium text-slate-600">
                  Let us help you create a polished resume or improve the one
                  you already have.
                </p>

                <ul className="space-y-2   text-slate-700 font-medium list-none">
                  <li>🌀 AI-powered resume builder</li>
                  <li>🌀 Intelligent feedback engine</li>
                  <li>🌀 Perfect for freshers and first-time job seekers</li>
                </ul>

                <Link to="/login">
                  <a
                    href="#explore"
                    className="mt-2 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-4 py-2 shadow-lg hover:from-indigo-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-base font-semibold transition-all"
                  >
                    Build my resume
                  </a>
                </Link>
              </div>
            </div>
          </section>

          {/* Section ? */}
          <section className="max-w-7xl mx-auto px-10 py-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 rounded-2xl shadow-xl border border-slate-200 p-8 bg-white/60 bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-4 py-2 shadow-lg hover:from-indigo-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 ">
              {/* Left Side Image */}
              <div className="w-full lg:w-90 ml-10">
                <img
                  src="https://internshala.com/static/images/homepage/employer_section/r1255.webp"
                  alt="Hiring illustration"
                  className="w-full h-auto rounded-xl object-contain"
                />
              </div>

              {/* Right Side Content */}
              <div className="w-full lg:w-170 space-y-4">
                <h1 className="mt-2 inline-flex items-center gap-3 rounded-2xl border border-white-600 px-4 py-2 text-base font-semibold transition-all">
                  IAMHR FOR EMPLOYERS
                </h1>

                <h1 className="text-3xl font-bold text-White-900">
                  Looking to hire freshers and interns?
                </h1>

                <p className="text-White-600 text-lg">
                  Access candidates with AI-powered tools and smart filters to
                  hire faster.
                </p>

                <Link to="/login">
                  <a
                    href="#explore"
                    className="mt-2 inline-flex items-center gap-3 rounded-2xl border border-white-600 px-4 py-2 text-base font-semibold transition-all"
                  >
                    Post now for free
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default MainHomePage;
