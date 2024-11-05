import React, { useState } from 'react'
import useConversation from './useConversation'
import toast from 'react-hot-toast'
import axios from 'axios'

const useSendMessage = () => {
 
  const [loading, setLoading] = useState(false)
  const {messages,setMessages,selectedConversation} = useConversation()

  const sendMessage = async (message) => {
    try {
      setLoading(true) 

      const token = localStorage.getItem('authToken')
      
      const { data } = await axios.post(`https://ezra-backend-9mjb.onrender.com/api/messages/send/${selectedConversation._id}`, 
        {message},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      
     
      setMessages([...messages, data])
    } catch (error) {
      
      toast.error(error.response?.data?.error || 'An error occurred')
    } finally {
      setLoading(false) 
    }
  }

  return { sendMessage, loading }
}

export default useSendMessage