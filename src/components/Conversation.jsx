import React from 'react'
import useConversation from './useConversation'

const Conversation = ({conversation,lastIdx,emoji}) => {
  const {selectedConversation, setSelectedConversation} =useConversation()

  const isSelected = selectedConversation?._id === conversation._id

  const defaultAvatar = 'https://static.vecteezy.com/system/resources/previews/021/079/672/non_2x/user-account-icon-for-your-design-only-free-png.png'
  return (
<>
    <div className={`flex gap-2 items-center hover:bg-sky-100 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-100" : ""}`}
    onClick={()=>setSelectedConversation(conversation)}>
    <div className='avatar'>
    <div className='w-12 rounded-full'>
    <img src={conversation.profilePic || defaultAvatar} alt='user avatar' className='w-12 h-12 rounded-full object-cover'/>
    </div>
    </div>
<div className='flex flex-col flex-1'>
    <div className='flex gap-3 justify-between'>
        <p className='font-bold text-green-900'>{conversation.fullName}</p>
        
    </div>
</div>
    </div>
    {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  )
}

export default Conversation