import React from "react";
import CardGrid from "./Intern/CardGrid";
import { motion } from "framer-motion";

export default function InternHome() {
  return (
    <>
      <main className=" bg-gradient-to-b from-slate-50 to-white text-slate-900">
        <motion.section
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <section className="max-w-7xl mx-auto px-8 pt-8 py-2 lg:pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center">
              {/* Left: Headline + CTA */}
              <div className="lg:col-span-6">
                <h1 className="text-[32px] sm:text-5xl font-extrabold leading-tight tracking-tight">
                  Your <span className="text-purple-600">future</span> starts
                  here
                  <br />
                </h1>

                <p className="mt-4 text-[20px] sm:text-xl text-slate-800 max-w-xl">
                  12k+ Intern for freshers, students & graduates!
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left">
                  <a
                    href="#explore"
                    className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 text-white px-4 py-2 sm:px-6 sm:py-2 shadow-lg hover:from-purple-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-purple-200 text-lg sm:text-lg font-medium w-full sm:w-auto"
                  >
                    Find Intern
                  </a>
                </div>
              </div>

              {/* Right: Visuals */}
              <div className="hidden lg:block lg:col-span-6">
                <div className="">
                  <img
                    src="https://d8it4huxumps7.cloudfront.net/uploads/images/676e5f765e786_internship_portal.png?d=1000x600"
                    alt="Students collaborating"
                    className="w-full object-cover"
                  />
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
            <CardGrid />
          </div>
        </motion.div>
      </main>
    </>
  );
}
