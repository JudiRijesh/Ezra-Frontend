import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../components/useSignup'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {

  const [inputs,setInputs] = useState({

    fullName:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:""

  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const {loading,signup} = useSignup()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    await signup(inputs)
  }

  const handleCheckboxChange = (gender) => {
    setInputs({...inputs,gender})
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <h1 className='text-3xl font-semibold text-center text-green-900'>SignUp
      <span className='text-green-900'> Chat</span>
      </h1>

        <form onSubmit={handleSubmit}>
          <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Full Name</span>
          </label>
          <input type='text' placeholder='Ex: John Doe' className='w-full input input-bordered h-10' value={inputs.fullName} onChange={(e)=> setInputs({...inputs, fullName: e.target.value})}/>
          </div>

          <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Username</span>
          </label>
          <input type='text' placeholder='Ex:johndoe' className='w-full input input-bordered h-10'value={inputs.username} onChange={(e)=> setInputs({...inputs, username: e.target.value})}/>
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder='Enter Password' className='w-full input input-bordered h-10 pr-10' value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-900" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <div className="relative">
              <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' className='w-full input input-bordered h-10 pr-10' value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} />
              <button type="button"  className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-900" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender={inputs.gender} />

          <Link to={"/login"} className='text-sm hover:underline hover:text-green-900 mt-2 inline-block' href='#'> Already have an account?</Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-green-900 hover:bg-green-900 hover:text-white' disabled={loading}>
            {loading ? <span className='loading loading-spinner'></span>:"Sign Up"}
            </button>
          </div>

        </form>

    </div>
    </div>
  )
}

export default Signup
