import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate()

    const logout = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
               
            });
           
            const data = res.data;
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("user");
            setAuthUser(null);
            navigate('/login')
        } catch (error) {
            
            toast.error(error.response?.data.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;