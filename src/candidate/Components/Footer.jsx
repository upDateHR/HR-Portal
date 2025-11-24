import React from 'react';
import { Mail, Phone, Send, Instagram, Linkedin, Globe, MonitorPlay } from 'lucide-react'; 
import { Link } from 'react-router-dom';

// Consistent color definitions based on Upstox theme
const UPSTOX_PURPLE = 'purple-700';
const UPSTOX_GRADIENT_START = 'from-purple-700';
const UPSTOX_GRADIENT_END = 'to-violet-600';

const Footer = () => {
  // Navigation Links Data
  const links = [
    { title: "About Us", items: [
      { label: "We're hiring", to: "/about/careers" },
      { label: "Hire interns for your company", to: "/hr/hire-interns" },
      { label: "Post a Job", to: "/hr/post-job" },
    ]},
    { title: "Team Diary", items: [
      { label: "Blog", to: "/blog" },
      { label: "Our Services", to: "/services" },
    ]},
    { title: "Legal", items: [
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Privacy", to: "/privacy" },
      { label: "Contact Us", to: "/contact" },
    ]},
    { title: "Opportunities", items: [
      { label: "Internships", to: "/internshippage" },
      { label: "Jobs", to: "/jobpage" },
      { label: "Courses", to: "/courses" },
    ]},
  ];

  const SocialIcon = ({ Icon, label, href, hoverColor }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`text-purple-200 hover:text-white transition duration-200 ${hoverColor}`}
      aria-label={label}
    >
      <Icon className="h-6 w-6" />
    </a>
  );

  return (
    // Main Footer Container with Branded Gradient
    <footer className="mt-8 w-full">
      {/* REDUCED PADDING: pt-8 pb-4 instead of pt-12 pb-6 */}
      <div className={`bg-gradient-to-r ${UPSTOX_GRADIENT_START} ${UPSTOX_GRADIENT_END} pt-8 pb-4 text-white shadow-2xl`}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Main Content Grid: Reduced vertical gap (gap-6) and padding (pb-6) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 text-xs border-b border-purple-500/50 pb-6 mb-4">
            
            {/* Column 1: Branding & Contact - Reduced spacing */}
            <div className="col-span-2 md:col-span-1 space-y-2">
              {/* Reduced font size for IamHR text */}
              <h1 className="text-xl font-bold">
                <span className={`text-white`}>Iam</span>HR
              </h1>
              <p className="text-[14px] font-light text-purple-100 mt-0.5">
                Built with ❤️ in India for the world.
              </p>

              <h3 className="text-[16px] font-semibold pt-1">Stay Connected</h3>
              <div className="space-y-1 text-[14px]">
                <div className="flex items-center space-x-1 text-purple-100">
                  <Mail className="h-3 w-3" />
                  <span>iamhr@gmail.com</span>
                </div>
                <div className="flex items-center space-x-1 text-purple-100">
                  <Phone className="h-3 w-3" />
                  <span>+91-9999999999</span>
                </div>
              </div>
            </div>

            {/* Navigation Columns (Reduced text size and spacing) */}
            {links.map((section, index) => (
              <div key={index} className="space-y-2">
                <h1 className="text-[16px] font-semibold border-b border-purple-400/50 pb-0.5 mb-2">{section.title}</h1>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link 
                        to={item.to} 
                        className="text-purple-100 hover:text-white transition duration-150 text-[14px]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section: Social Icons & Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-2">
            
            {/* Social Icons (Reduced size) */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-3 sm:mb-0">
              <SocialIcon Icon={Send} label="Telegram" href="https://t.me/update_edu" hoverColor="hover:text-cyan-300" />
              <SocialIcon Icon={Instagram} label="Instagram" href="https://www.instagram.com/update_edu/?igsh=bDF3eDUxOG1wbHZ2" hoverColor="hover:text-pink-300" />
              <SocialIcon Icon={Linkedin} label="LinkedIn" href="https://www.linkedin.com/company/updateedu/posts/?feedView=all&viewAsMember=true" hoverColor="hover:text-blue-400" />
              <SocialIcon Icon={Globe} label="Website" href="https://www.updats.in/" hoverColor="hover:text-lime-300" />
              {/* <SocialIcon Icon={MonitorPlay} label="YouTube" href="#" hoverColor="hover:text-red-400" /> */}
            </div>
            
            {/* Copyright: Clean, centered on mobile */}
            <div className="text-[14px] text-purple-200 text-center sm:text-right">
              <p>Copyright © {new Date().getFullYear()} IamHR Education Technology Pvt Ltd</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;