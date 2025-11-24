import React from "react";
import JobCardGrid from "./Job/JobCardGrid";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function JobHome() {
  return (
    <>
      <main className=" bg-gradient-to-b from-slate-50 to-white text-slate-900">
        <motion.section
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <section className="max-w-7xl mx-auto px-10 py-2 lg:pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center">
              {/* Left: Headline + CTA */}
              <div className="lg:col-span-6">
                <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                  Your <span className="text-purple-600">future</span> starts
                  here
                  <br />
                </h1>

                <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-xl">
                  12k+ Jobs for freshers, students & graduates!
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="#explore"
                    className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-500 text-white px-6 py-3 shadow-lg hover:from-purple-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-purple-200 text-lg font-medium"
                  >
                    Find Jobs
                  </a>

                  {/* Employer-only CTA removed: Post Jobs */}
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
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-0"
        >
          <div className="mb-10">
            <JobCardGrid />
          </div>
        </motion.div>
      </main>
    </>
  );
}
