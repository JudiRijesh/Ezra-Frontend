import { IoSend } from "react-icons/io5";
import React, { useState } from 'react'
import useSendMessage from "./useSendMessage";

const MessageInput = () => {

  const [message,setMessage] = useState("")
  const {loading,sendMessage} = useSendMessage()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(!message) return
    await sendMessage(message)
      setMessage("")
  }

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
        <input type='text' className='mt-7 border text-sm rounded-lg block w-full p-2.5 bg-white-700 border-green-950 text-green' placeholder='Type a message'
          value={message} onChange={(e)=> setMessage(e.target.value)}/>

        <button type='submit' className='absolute inset-y-0 right-0 flex items-center pr-3'>
        {loading ? <div className='loading loading-spinner'></div>:<IoSend />}
        </button>

        </div>
    </form>
  )
}

export default MessageInput