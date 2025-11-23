import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div>
        <div className="bg-gradient-to-r from-purple-600 to-violet-500 pt-5 pb-2">
          <div className="flex justify-around items-start text-white">
            <div>
              <h1 className="text-1xl font-bold">IamHR</h1>
              <p>Build with❤️in India for the world</p>

              <h3>Stay Connected</h3>
              <p>iamhr@gmail.com</p>
              <p>+91-9999999999</p>
            </div>
            <div>
              <h1>About Us</h1>
              <p>We're hiring</p>
              <p>Hire interns for your company</p>
              <p>Post a Job</p>
            </div>
            <div>
              <h1>Team Diary</h1>
              <p>Blog</p>
              <p>Our Services</p>
            </div>
            <div>
              <h1>Terms & Conditions</h1>
              <p>Privacy</p>
              <p>Contact Us</p>
            </div>
            <div>
              <h1>Apply</h1>
              <p>Internships</p>
              <p>Jobs</p>
              <p>Courses</p>
            </div>
          </div>

          <div className="flex justify-between items-start px-12 py-3">
            <div>
              <ul className="flex gap-4 text-2xl text-white">
                <li className="hover:text-blue-500 transition">
                  <i className="fa-brands fa-telegram"></i>
                </li>
                <li className="hover:text-pink-600 transition">
                  <i className="fa-brands fa-instagram"></i>
                </li>
                <li className="hover:text-blue-600 transition">
                  <i className="fa-brands fa-linkedin"></i>
                </li>
                <li className="hover:text-green-600 transition">
                  <i className="fa-solid fa-earth-americas"></i>
                </li>
                <li className="hover:text-red-600 transition">
                  <i className="fa-brands fa-youtube"></i>
                </li>
              </ul>
            </div>
            <div className="flex justify-center items-center text-white">
              <p>Copyright © 2025 upDate Education Technology Pvt Ltd</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
