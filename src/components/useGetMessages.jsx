import React, { useEffect, useState } from 'react'
import useConversation from './useConversation'
import axios from 'axios'
import toast from 'react-hot-toast'

const useGetMessages = () => {
const [loading,setLoading] = useState(false)

  const{messages,setMessages,selectedConversation}= useConversation()

useEffect(()=>{
    const getMessages = async () =>{
        setLoading(true)
        try {

            const token = localStorage.getItem('authToken')
            const { data } = await axios.get(
                `http://localhost:5005/api/messages/${selectedConversation._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
      
            
              setMessages(data)
            } catch (error) {
              toast.error(error.response?.data?.error || 'An error occurred')
            } finally {
              setLoading(false)
            }
          }
      
          
          if (selectedConversation?._id) getMessages()
        }, [selectedConversation?._id, setMessages])
      
        return { messages, loading }
      }
      
      export default useGetMessages