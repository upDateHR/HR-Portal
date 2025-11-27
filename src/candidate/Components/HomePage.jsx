import React from "react";
import "./HomePage.css";
import JobCardGrid from "./CandidateContent/Job/JobCardGrid";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Consistent color definitions based on Upstox theme
const UPSTOX_TEXT_PURPLE = 'purple-600';
const UPSTOX_PURPLE = 'purple-700';
const UPSTOX_GRADIENT_START = 'from-purple-600';
const UPSTOX_GRADIENT_END = 'to-violet-600'; // Slightly contrasting purple/violet for depth
const UPSTOX_HOVER_PURPLE = 'purple-700';
const UPSTOX_LIGHT_GRAY = 'gray-50';

export default function HomePage() {
  return (
    <>
      <main className={`bg-gradient-to-b from-${UPSTOX_LIGHT_GRAY} to-white text-gray-900`}>
        <section className="max-w-7xl mx-auto px-6 sm:px-10 py-10 lg:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Headline + CTA */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                Unlock your career — <br />
                <span className={`text-${UPSTOX_TEXT_PURPLE}`}>get noticed</span> and get
                hired
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl">
                Explore curated opportunities from top companies worldwide. Grow
                skills, earn CV points, build a portfolio and land your dream
                role — all in one place.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {/* Primary CTA: Uses Branded Gradient */}
                <a
                  href="/candidate/jobpage"
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl 
                    bg-gradient-to-r ${UPSTOX_GRADIENT_START} ${UPSTOX_GRADIENT_END} text-white 
                    shadow-xl shadow-purple-300/50 
                    hover:bg-purple-700 hover:shadow-2xl 
                    focus:outline-none focus:ring-4 focus:ring-purple-200 
                    text-base font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5`}
                >
                  Explore Opportunities
                </a>

                {/* Secondary CTA: Outline Style */}
                <a
                  href=""
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-xl 
                    border border-gray-300 text-gray-700 bg-white 
                    shadow-sm hover:bg-purple-50 hover:border-${UPSTOX_TEXT_PURPLE} hover:text-${UPSTOX_TEXT_PURPLE}
                    transition duration-300`}
                >
                  How it works
                </a>
              </div>
            </div>

            {/* Right: Visuals */}
            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
              <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02]">
                <img
                  src="https://d8it4huxumps7.cloudfront.net/uploads/images/676e555db74f7_compete.png?d=1000x600"
                  alt="Students collaborating"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* JOB CATEGORIES SECTION */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 py-5">
          <div className="flex flex-col justify-start lg:flex-row lg:items-center gap-6">
            <div className="text-center lg:text-left flex-shrink-0">
              <h2 className={`text-2xl font-bold text-${UPSTOX_PURPLE} leading-tight`}>
                Top Roles
              </h2>
              <p className="text-lg text-gray-600 mt-1">Explore Categories</p>
            </div>

            <div className="w-full">
              {/* Category Chips: Using purple for accents */}
              <ul className="flex gap-3 items-center overflow-x-auto lg:flex-wrap lg:overflow-visible py-2">
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
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white shadow-sm 
                        hover:border-${UPSTOX_TEXT_PURPLE} hover:text-${UPSTOX_TEXT_PURPLE} transition 
                        focus:outline-none focus:ring-2 focus:ring-${UPSTOX_TEXT_PURPLE}`}
                      aria-label={item.label}
                    >
                      {/* Icon Circle: Using Purple/White Theme */}
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-${UPSTOX_PURPLE} text-lg`}>
                        {item.emoji}
                      </span>
                      <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* SKILLS CARD */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-0"
        >
          <section className="max-w-7xl mx-auto px-6 sm:px-10 pb-16 pt-6">
            <div className={`flex flex-col lg:flex-row items-center gap-10 rounded-xl shadow-2xl border border-gray-100 p-8 bg-white/70 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-2xl`}>
              {/* Left Image */}
              <div className="flex justify-center w-full lg:w-1/2 order-2 lg:order-1">
                <img
                  src="/Skills.png"
                  alt="Skills"
                  className="h-64 rounded-xl object-contain shadow-lg"
                />
              </div>
  
              {/* Right Content */}
              <div className="w-full lg:w-1/2 space-y-4 flex flex-col justify-start text-start order-1 lg:order-2">
                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                  Learn & Level Up Your Skills
                </h1>
  
                <p className="text-lg text-gray-600">
                  Select from a wide range of courses to upskill and advance
                  your career!
                </p>
  
                <Link to="#">
                  {/* Explore Skills Button: Uses Branded Gradient */}
                  <button 
                    className={`mt-4 px-6 py-3 rounded-xl 
                      bg-gradient-to-r ${UPSTOX_GRADIENT_START} ${UPSTOX_GRADIENT_END} text-white 
                      shadow-md hover:from-purple-700 hover:to-violet-700 
                      focus:outline-none focus:ring-4 focus:ring-purple-300 
                      transition-all duration-300 ease-out hover:-translate-y-0.5`}
                  >
                    Explore Skills
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </motion.div>

        {/* JobCardGrid (assuming this handles its own layout) */}
        <JobCardGrid />

        {/* --- */}

        {/* RESUME BUILDER CARD */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
          <div className={`flex flex-col lg:flex-row items-center gap-12 rounded-xl shadow-2xl border border-gray-100 p-8 bg-white/70 backdrop-blur 
            bg-[url('https://internshala.com/static/images/homepage/resume_builder_v1/r1920.webp')] bg-contain bg-right bg-no-repeat 
            transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-2xl`}
          >
            <div className="space-y-4 flex flex-col justify-start text-start w-full lg:w-1/2">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                No resume? No problem.
              </h1>
              <p className="text-lg font-medium text-gray-600">
                Let us help you create a polished resume or improve the one you
                already have.
              </p>

              <ul className={`space-y-2 text-gray-700 font-medium list-none text-base`}>
                {/* Icons changed to branded purple dots */}
                <li><span className={`text-${UPSTOX_TEXT_PURPLE} font-extrabold mr-2`}>•</span> AI-powered resume builder</li>
                <li><span className={`text-${UPSTOX_TEXT_PURPLE} font-extrabold mr-2`}>•</span> Intelligent feedback engine</li>
                <li><span className={`text-${UPSTOX_TEXT_PURPLE} font-extrabold mr-2`}>•</span> Perfect for freshers and first-time job seekers</li>
              </ul>

              <Link to="/candidate/resumepage">
                {/* Build Resume Button: Uses Branded Gradient */}
                <a
                  href="#explore"
                  className={`mt-4 inline-flex items-center gap-3 px-6 py-3 rounded-xl 
                    bg-gradient-to-r ${UPSTOX_GRADIENT_START} ${UPSTOX_GRADIENT_END} text-white 
                    shadow-xl shadow-purple-300/50 
                    hover:from-purple-700 hover:to-violet-700 
                    focus:outline-none focus:ring-4 focus:ring-purple-300 
                    text-base font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5`}
                >
                  Build my resume
                </a>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}