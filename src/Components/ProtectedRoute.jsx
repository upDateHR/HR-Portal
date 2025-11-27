import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children, allowedRole }) {
    const token = (() => {
        try {
            return localStorage.getItem('hr_token') || localStorage.getItem('token')
        } catch {
            return null
        }
    })()

    const location = useLocation()
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // If an allowedRole is specified, verify the stored user's role matches
    if (allowedRole) {
        try {
            const raw = localStorage.getItem('hr_user') || localStorage.getItem('user')
            const parsed = raw ? JSON.parse(raw) : null
            const role = parsed && (parsed.role || parsed.user?.role)
            if (!role || (Array.isArray(allowedRole) ? !allowedRole.includes(role) : role !== allowedRole)) {
                // role mismatch — redirect to landing
                return <Navigate to="/" replace />
            }
        } catch (e) {
            return <Navigate to="/" replace />
        }
    }

    return children
}
