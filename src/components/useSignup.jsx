import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'


function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all the fields')
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return false
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false
    }

    return true
}

const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender })
        if (!success) return

        setLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
                fullName, 
                username, 
                password, 
                confirmPassword, 
                gender
            })

            const data = res.data
            console.log(data)

            // Storing the user data in local storage
            localStorage.setItem('user', JSON.stringify(data.user))
            setAuthUser(data)

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'An error occurred')
            } else if (error.request) {
                toast.error('No response from server')
            } else {
                toast.error(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return { loading, signup }
}

export default useSignup
