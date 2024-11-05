import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'


function handleInputErrors({ username, password}) {
    if (!username || !password) {
        toast.error('Please fill in all the fields')
        return false
    }

    return true
}
const useLogin = () => {

    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const login = async (username, password) => {
        const success = handleInputErrors({username,password})
        if(!success)
            return 
        setLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                username,
                password
            })
            localStorage.setItem("authToken", res.data.authToken);
            
            const data = res.data

            if (data.error) {
                toast.error(data.error)
            } else {
                
                localStorage.setItem("user", JSON.stringify(data)); 
                setAuthUser(data); 
                toast.success("Login successful!");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return { loading, login }
}

export default useLogin