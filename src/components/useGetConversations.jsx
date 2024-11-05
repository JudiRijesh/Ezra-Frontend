import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            const token = localStorage.getItem("authToken") 
            try {
                const res = await axios.get("http://localhost:5005/api/users", {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                })
                const data = res.data;

                if (data.error) {
                    throw new Error(data.error)
                }

                setConversations(data)
            } catch (error) {
                toast.error(error.response?.data?.error || 'Failed to fetch conversations')
            } finally {
                setLoading(false)
            }
        }

        getConversations()
    }, [])

    return { loading, conversations }
};

export default useGetConversations;