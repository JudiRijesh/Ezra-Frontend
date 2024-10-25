import React from 'react'
import { TbLogout2 } from "react-icons/tb";
import useLogout from './useLogout';

const LogoutButton = () => {
    const {loading, logout} =useLogout()
  return (
    <div className='mt-auto'>
    {!loading?(
        <TbLogout2 className='mt-2 w-6 h-6 text-green cursor-pointer' onClick={logout}/>):

        (<span className='loading loading-spinner'></span>

        )}
        
    </div>
  )
}

export default LogoutButton