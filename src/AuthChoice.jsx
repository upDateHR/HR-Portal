import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function AuthChoice({ type = 'signup' }) {
    const location = useLocation()
    const navigate = useNavigate()
    const role = location.state?.role

    useEffect(() => {
        if (role) {
            // auto-redirect if role passed via Link state
            if (type === 'signup') {
                if (role === 'candidate') navigate('/candidate/signup', { replace: true })
                else navigate('/company', { replace: true })
            } else {
                if (role === 'candidate') navigate('/candidate/login', { replace: true })
                else navigate('/company', { replace: true })
            }
        }
    }, [role, type, navigate])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
                <h2 className="text-2xl font-semibold mb-4">{type === 'signup' ? 'Sign up as' : 'Sign in as'}</h2>
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => {
                            if (type === 'signup') navigate('/candidate/signup')
                            else navigate('/candidate/login')
                        }}
                        className="px-4 py-3 bg-blue-600 text-white rounded-md"
                    >
                        Candidate
                    </button>

                    <button
                        onClick={() => {
                            navigate('/company')
                        }}
                        className="px-4 py-3 border border-gray-300 rounded-md"
                    >
                        Employer / Company
                    </button>
                </div>
            </div>
        </div>
    )
}
