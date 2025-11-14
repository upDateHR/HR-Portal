import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
            <div className="flex items-center justify-between px-6 py-4 md:px-10">

                {/* Logo */}
                <h1 className="text-2xl font-bold text-indigo-600">
                    Iam<span className="text-gray-800">HR</span>
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6 font-medium">
                    <li className="hover:text-indigo-600 cursor-pointer">Home</li>
                    <li className="hover:text-indigo-600 cursor-pointer">Internships</li>
                    <li className="hover:text-indigo-600 cursor-pointer">Jobs</li>
                    <li className="hover:text-indigo-600 cursor-pointer">Mock Tests</li>
                    <li className="hover:text-indigo-600 cursor-pointer">Contact</li>
                </ul>
                <div className="flex">

                    {/* Login Button */}
                    <button className="hidden md:block px-5 py-2 m-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                        Login
                    </button>
                    <button className="hidden md:block px-5 py-2 m-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                        Registre
                    </button>

                    {/* Mobile Toggle Button */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? "✖" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white border-t">
                    <ul className="flex flex-col gap-4 px-6 py-4 font-medium">
                        <li className="hover:text-indigo-600 cursor-pointer">Home</li>
                        <li className="hover:text-indigo-600 cursor-pointer">Internships</li>
                        <li className="hover:text-indigo-600 cursor-pointer">Jobs</li>
                        <li className="hover:text-indigo-600 cursor-pointer">Mock Tests</li>
                        <li className="hover:text-indigo-600 cursor-pointer">Contact</li>
                    </ul>
                    <div className="px-6 pb-4">
                        <button className="w-50% px-5 py-2 m-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                            Login
                        </button>
                        <button className="w-50% px-5 py-2 m-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                            Registration
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
