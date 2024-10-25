import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../components/useLogin'

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {loading, login} = useLogin()

  const handleSubmit =async (e) => {
    e.preventDefault()
    await login(username,password)
  }
   
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-grey-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
    <h1 className='text-3xl font-semibold text-center text-green-900'>Login
    <span className='text-green-900'> Chat</span>
    </h1>

    <form onSubmit={handleSubmit}>
    <div>
        <label className='label p-5'>
            <span className='text-base label-text'>Username</span>
        </label>
        <input type='text' placeholder='Enter Username' className='w-full input input-bordered h-10' value={username} onChange={(e) => setUsername(e.target.value)}/>
    </div>
    <div>
        <label className='label p-5'>
            <span className='text-base label-text'>Password</span>
        </label>
        <input type='password' placeholder='Enter Password' className='w-full input input-bordered h-10' value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>

    <Link to='/signup' className='label p-5 text-sm hover:underline hover:text-green-900 mt-2 inline-block'>
    {"Don't"} have an account ?
   </Link>
    <button className='btn btn-block btn-sm mt-2 border border-green-900 hover:bg-green-900 hover:text-white' disabled={loading}>
    {loading ? <span className='loading loading-spinner'></span> :"Login"}
    </button>
    </form>

    </div>


    </div>
  )
}

export default Login