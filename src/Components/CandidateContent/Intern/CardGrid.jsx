import React from "react";
import Cards from "./Cards";

const cards = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechNova",
    location: "Bangalore, India",
    employees: "100–500 employees",
    remote: true,
    skills: ["React", "Tailwind", "UI/UX"],
    stipend: "₹10,000/mo",
    duration: "3 Months • Full-time",
    img: "/React.png",
    alt: "TechNova logo",
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    company: "DataCore",
    location: "Hyderabad, India",
    employees: "50–200 employees",
    remote: false,
    skills: ["Node.js", "Express", "MongoDB"],
    stipend: "₹12,000/mo",
    duration: "4 Months • Full-time",
    img: "/Nodejs.png",
    alt: "DataCore logo",
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "CreativeLabs",
    location: "Mumbai, India",
    employees: "20–100 employees",
    remote: true,
    skills: ["Figma", "Prototyping", "User Research"],
    stipend: "₹8,000/mo",
    duration: "3 Months • Part-time",
    img: "/figma.png",
    alt: "CreativeLabs logo",
  },
];

const CardGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-10 pt-6">
        <h2 className="text-2xl font-bold mb-2">Internships</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((c) => (
          <Cards key={c.id} {...c} />
        ))}
      </div>
    </section>
  );
};

export default CardGrid;
