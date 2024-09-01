import React from 'react'
import GenderCheckbox from './GenderCheckbox'

const Signup = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Signup
                <span className='text-blue-500 ml-2'>
                    ChatApp
                </span>
            </h1>

            <form action="">
                <div>
                    <label className='label p-2' htmlFor="fullname">
                        <span className='text-base label-text'>Fullname</span>
                    </label>
                    <input type="text" name='fullname' id='fullname' placeholder='Enter fullname' className='w-full input input-bordered h-10' />
                </div>
                <div>
                    <label className='label p-2' htmlFor="username">
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type="text" name='username' id='username' placeholder='Enter username' className='w-full input input-bordered h-10' />
                </div>


                {/* Gender checkbox */}
                <GenderCheckbox></GenderCheckbox>
                
                <div>
                    <label className='label p-2' htmlFor="password">
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type="password" name='password' id='password' placeholder='Enter password' className='w-full input input-bordered h-10' />
                </div>
                <div>
                    {/* <label className='label p-2' htmlFor="confirmPassword">
                        <span className='text-base label-text'>Confirm Password</span>
                    </label> */}
                    <input type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirm password' className='w-full input input-bordered h-10 mt-4' />
                </div>

                <a href="#" className='text-sm hover:underline hover:text-blue-600  mt-2 inline-block '>
                    Already have an account?
                </a>

                <div>
                <button className="btn btn-block btn-sm mt-6 border border-slate-700">Login</button>
                </div>
            </form>
        </div>
        
    </div>
  )
}

export default Signup