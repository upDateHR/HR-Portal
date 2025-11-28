import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <main className="bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Section 1 - Hero */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-10 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Headline + CTA */}
            <div className="lg:col-span-6 space-y-4 text-start lg:text-left">
              <h1 className="text-[35px] sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-start">
                Start Your Career Journey — <span className="text-purple-600">Internships & Hiring </span>
              </h1>

              <p className="mt-2 text-base text-[20px] sm:text-lg text-slate-900 max-w-xl mx-auto lg:mx-0">
                Join our internship platform where students explore real
                opportunities and companies discover skilled candidates ready to
                grow.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-violet-500 text-white px-6 py-3 text-base sm:text-base shadow-lg hover:from-purple-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 ease-out hover:-translate-y-0.5 font-bold"
                >
                  Explore Opportunities
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-6 py-3 text-base sm:text-base text-slate-700 bg-white hover:bg-slate-50 shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 font-bold"
                >
                  How it works
                </Link>
              </div>
            </div>

            {/* Right: Visuals */}
            <div className="lg:col-span-6 mt-4 lg:mt-0">
              <div className="transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02]">
                <img
                  src="https://d8it4huxumps7.cloudfront.net/uploads/images/676e5f765e786_internship_portal.png?d=1000x600"
                  alt="Students collaborating"
                  className="w-full max-w-xl mx-auto object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </motion.section>

      {/* Section 2 - Internships categories */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <section className="max-w-7xl flex justify-center mx-auto px-6 sm:px-8 py-6 lg:py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
            <div className="text-start lg:text-left">
              <h2 className="text-base text-[22px] sm:text-lg font-bold text-slate-900 leading-tight">
                Internships
              </h2>
              <p className="text-[18px] sm:text-lg text-slate-600 mt-1">
                Categories
              </p>
            </div>

            <div className="w-full">
              {/* horizontally scrollable on small screens, wraps on larger */}
              <ul className="flex gap-3 sm:gap-4 items-center overflow-x-auto whitespace-nowrap lg:flex-wrap lg:overflow-visible lg:whitespace-normal py-2">
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
                      className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-200"
                      aria-label={item.label}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 text-lg">
                        {item.emoji}
                      </span>
                      <span className="text-md sm:text-sm font-medium text-slate-800 whitespace-nowrap">
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Section 3 - Who's using IamHR */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        // className="text-center"
      >
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
          <div>
            <h2 className="text-[20px] sm:text-xl font-bold text-slate-900 lg:text-left text-start mb-4">
              Who's using IamHR?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 bg-white shadow-sm p-4 sm:p-5 rounded-xl border border-slate-100">
                <img
                  src="/Students.png"
                  alt=""
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                />
                <div className="text-left">
                  <h3 className="text-md sm:text-base font-semibold">
                    Students & Professionals
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Unlock Your Potential: Compete, Build Resume, Grow and get
                    Hired!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white shadow-sm p-4 sm:p-5 rounded-xl border border-slate-100">
                <img
                  src="/Companies.png"
                  alt=""
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                />
                <div className="text-left">
                  <h3 className="text-sm sm:text-base font-semibold">
                    HR Managers & Recruiters
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Unlock Your Potential: Compete, Build Resume, Grow and get
                    Hired!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white shadow-sm p-4 sm:p-5 rounded-xl border border-slate-100">
                <img
                  src="/Academia.png"
                  alt=""
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                />
                <div className="text-left">
                  <h3 className="text-sm sm:text-base font-semibold">
                    Founders & Hiring Teams
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Unlock Your Potential: Compete, Build Resume, Grow and get
                    Hired!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Section 4 - Skills */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-12 pt-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 rounded-xl shadow-lg border border-slate-100 p-5 sm:p-6 lg:p-8 bg-white/70 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
            {/* Left Image */}
            <div className="flex justify-center w-full lg:w-1/2">
              <img
                src="/Skills.png"
                alt="Skills"
                className="h-52 sm:h-60 rounded-xl object-contain"
              />
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2 space-y-3 flex flex-col justify-start text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                Learn & Level Up Your Skills
              </h1>

              <p className="text-sm sm:text-lg text-slate-600">
                Select from a wide range of courses to upskill and advance your
                career!
              </p>

              <Link to="/signup">
                <button className="mt-3 px-4 sm:px-5 py-3 bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-purple-300 text-white rounded-xl shadow-md text-[15px] sm:text-base transition-all duration-300 ease-out hover:-translate-y-0.5">
                  Explore Skills
                </button>
              </Link>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Section 5 - Popular courses */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl text-left font-bold text-slate-900">
              Popular certification courses
            </h1>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className="w-full rounded-2xl shadow-md border border-slate-200 bg-white flex flex-col transform transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
                >
                  <img
                    src={course.img}
                    alt={course.title}
                    className="w-full h-40 sm:h-44 object-cover rounded-t-[15px]"
                  />

                  <div className="p-4 sm:p-5 space-y-2 flex-grow flex flex-col justify-start text-left">
                    <p className="text-[15px] sm:text-sm font-medium text-slate-500">
                      {course.duration}
                    </p>

                    <h2 className="text-[20px] lg:text-[18px] font-semibold text-slate-700 leading-tight">
                      {course.title}
                    </h2>

                    <p className="text-[15px] sm:text-sm font-medium text-slate-800">
                      ⭐ {course.rating} | {course.learner} learners
                    </p>

                    <div className="mt-auto">
                      <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 text-white px-4 py-2 text-[17px] sm:text-sm shadow-lg hover:from-purple-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-purple-200 font-medium transition-all duration-300 ease-out hover:-translate-y-0.5"
                      >
                        Know more
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>

      {/* Section 6 - Resume builder */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 rounded-2xl shadow-xl border border-slate-200 p-5 sm:p-6 lg:p-8 bg-white/60 backdrop-blur bg-[url('https://internshala.com/static/images/homepage/resume_builder_v1/r1920.webp')] bg-contain bg-right bg-no-repeat transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl">
            <div className="space-y-3 flex flex-col justify-start text-left max-w-xl">
              <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-slate-700">
                No resume? No problem.
              </h1>
              <p className="text-[16px] sm:text-lg font-medium text-slate-900">
                Let us help you create a polished resume or improve the one you
                already have.
              </p>

              <ul className="space-y-1 sm:space-y-2 text-[18px] sm:text-lg text-slate-800 font-medium list-none">
                <li>🌀 AI-powered resume builder</li>
                <li>🌀 Intelligent feedback engine</li>
                <li>🌀 Perfect for freshers and first-time job seekers</li>
              </ul>

              <Link
                to="/login"
                className="mt-2 inline-flex items-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 text-white px-2 py-2 text-md sm:text-base shadow-lg hover:from-purple-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-purple-300 font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 w-41 flex justify-center"
              >
                Build my resume
              </Link>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Section 7 - CV points / Real projects / Global roles */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-4"
      >
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-10 flex justify-center">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl">
            {/* Item 1 */}
            <li className="flex items-start gap-3 sm:gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <span className="flex h-12 w-12 sm:h-14 sm:w-16 items-center justify-center rounded-lg bg-purple-50 text-purple-600 text-lg font-semibold">
                ★
              </span>
              <div className="flex flex-col text-left">
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-800">
                  CV points
                </h3>
                <p className="text-md sm:text-lg text-slate-800">
                  Earn verified achievements
                </p>
              </div>
            </li>

            {/* Item 2 */}
            <li className="flex items-start gap-3 sm:gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600 text-lg font-semibold">
                ⚡
              </span>
              <div className="flex flex-col text-left">
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-800">
                  Real projects
                </h3>
                <p className="text-md sm:text-lg text-slate-800">
                  Work with companies
                </p>
              </div>
            </li>

            {/* Item 3 */}
            <li className="flex items-start gap-3 sm:gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600 text-lg font-semibold">
                🌍
              </span>
              <div className="flex flex-col text-left">
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-800">
                  Global roles
                </h3>
                <p className="text-md sm:text-lg text-slate-800">
                  Remote & onsite
                </p>
              </div>
            </li>
          </ul>
        </section>
      </motion.div>

      {/* Section 8 - Employers */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 rounded-2xl shadow-xl border border-slate-200 p-5 sm:p-6 lg:p-8 bg-white/60 bg-gradient-to-r from-purple-600 to-violet-500 text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl">
            {/* Left Side Image */}
            <div className="w-60  lg:w-1/2 sm:20 transition-transform duration-500 ease-out hover:-translate-y-1">
              <img
                src="https://internshala.com/static/images/homepage/employer_section/r1255.webp"
                alt="Hiring illustration"
                className="w-full flex justify-start items-start h-auto rounded-xl object-contain"
              />
            </div>

            {/* Right Side Content */}
            <div className="w-full space-y-3 flex flex-col justify-start text-left">
              <span className="inline-flex justify-center sm:justify-center items-center gap-3 rounded-2xl border border-white w-55 px-4 py-2 text-xs sm:text-sm font-semibold ">
                IAMHR FOR EMPLOYERS
              </span>

              <h1 className="text-2xl sm:text-3xl font-bold mt-4 text-white">
                Looking to hire freshers and interns?
              </h1>

              <p className="text-sm sm:text-lg text-slate-100">
                Access candidates with AI-powered tools and smart filters to
                hire faster.
              </p>

              <Link
                to="/login"
                className="mt-2 ms:m-auto inline-flex items-center justify-center sm:justify-center gap-2 sm:gap-3 rounded-2xl border border-white px-4 py-2 text-sm sm:text-base font-semibold transition-all duration-300 ease-out w-45 hover:bg-white hover:text-purple-600"
              >
                Post now for free
              </Link>
            </div>
          </div>
        </section>
      </motion.div>
    </main>
  );
};

export default MainHomePage;
