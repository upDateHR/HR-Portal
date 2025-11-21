import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { sendMessageToAssistant } from "../employer/helpers/employerService";
import { Sparkles } from 'lucide-react';
import { BsRobot } from "react-icons/bs";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hello 👋 I'm ImHR Assistant! How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    // 🔍 Detect logged-in user role correctly
    const storedCandidate = localStorage.getItem("candidate_user");
    const storedRecruiter = localStorage.getItem("hr_user");

    let role = "guest";
    if (storedCandidate) role = "candidate";
    if (storedRecruiter) role = "recruiter";

    // 🎯 ROLE-BASED QUICK ACCESS BUTTONS
    const quickButtons = {
        guest: [
            "Resume",
            "Student's Help",
            "Post Job",
            "Recruiter's Help"
        ],
        candidate: [
            "My Applications",
            "Improve Resume",
            "Recommended Jobs"
        ],
        recruiter: [
            "Resume",
            "Student's Help",
            "Post Job",
            "Recruiter's Help"
        ]
    };

    const currentButtons = quickButtons[role] || quickButtons.guest;

    // AUTO-SCROLL
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleQuickAsk = async (q) => {
        setMessages(prev => [...prev, { sender: "user", text: q }]);
        setIsLoading(true);

        try {
            const reply = await sendMessageToAssistant(q);
            setMessages(prev => [...prev, { sender: "bot", text: reply }]);
        } catch {
            setMessages(prev => [...prev, { sender: "bot", text: "Something went wrong." }]);
        }

        setIsLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const reply = await sendMessageToAssistant(userMessage);
            setMessages(prev => [...prev, { sender: "bot", text: reply }]);
        } catch {
            setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I'm having trouble connecting." }]);
        }

        setIsLoading(false);
    };

    return (
        <>
            {/* FLOATING ICON (Animated Up-Down) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 p-4 rounded-full shadow-xl 
                bg-gradient-to-r from-purple-600 to-purple-500 text-white 
                hover:scale-110 transition transform z-50 animate-bounce-slow"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <BsRobot className="w-8 h-8" />
                )}
            </button>

            {/* CHAT WINDOW */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 h-[450px] bg-white 
                rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden 
                border border-purple-200">

                    {/* HEADER */}
                    <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-500 
                    text-white flex items-center rounded-t-2xl">
                        <Sparkles className="w-5 h-5 mr-2" />
                        <h3 className="font-semibold tracking-wide">ImHR Assistant</h3>
                    </div>

                    {/* MESSAGES */}
                    <div className="flex-grow p-3 space-y-3 overflow-y-auto bg-white">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`px-3 py-2 rounded-xl max-w-[75%] text-sm leading-relaxed ${
                                        msg.sender === 'user'
                                            ? 'bg-purple-100 text-purple-900'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="px-3 py-2 rounded-xl text-sm bg-gray-100 text-gray-600 animate-pulse">
                                    Typing…
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* QUICK ACCESS BUTTONS - NOW ROLE BASED */}
                    <div className="grid grid-cols-2 gap-2 p-2 bg-purple-50 border-t border-purple-100">
                        {currentButtons.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleQuickAsk(q)}
                                className="text-xs px-2 py-1 bg-purple-200 text-purple-800 
                                rounded-lg hover:bg-purple-300 transition"
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    {/* INPUT BAR */}
                    <form onSubmit={handleSubmit} className="p-3 border-t border-purple-100 bg-white">
                        <div className="flex">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                                placeholder="Ask something..."
                                className="flex-grow border border-gray-300 rounded-l-xl p-2 text-sm focus:outline-purple-500"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="p-2 bg-purple-600 text-white rounded-r-xl hover:bg-purple-700 disabled:bg-purple-300"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ChatWidget;
