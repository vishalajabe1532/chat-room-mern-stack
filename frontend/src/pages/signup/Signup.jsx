import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup.js";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const {loading,signup} = useSignup();



  const handleCheckboxChange=(gender)=>{
    setInputs({...inputs,gender});
  }


  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    
    await signup(inputs)

  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup
          <span className="text-blue-500 ml-2">ChatApp</span>
        </h1>

        <form action="" onSubmit={handleSubmit}>
          <div>
            <label className="label p-2" htmlFor="fullname">
              <span className="text-base label-text">Fullname</span>
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Enter fullname"
              className="w-full input input-bordered h-10"
              value={inputs.fullname}
              onChange={(e)=>{setInputs({...inputs,fullname:e.target.value})}}
            />
          </div>
          <div>
            <label className="label p-2" htmlFor="username">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e)=>{setInputs({...inputs,username:e.target.value})}}
            />
          </div>

          {/* Gender checkbox */}
          <GenderCheckbox handleCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}></GenderCheckbox>

          <div>
            <label className="label p-2" htmlFor="password">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e)=>{setInputs({...inputs,password:e.target.value})}}
            />
          </div>
          <div>
            {/* <label className='label p-2' htmlFor="confirmPassword">
                        <span className='text-base label-text'>Confirm Password</span>
                    </label> */}
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              className="w-full input input-bordered h-10 mt-4"
              value={inputs.confirmPassword}
              onChange={(e)=>{setInputs({...inputs,confirmPassword:e.target.value})}}
            />
          </div>

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600  mt-2 inline-block "
          >
            Already have an account?
          </Link>

          <div>
          <button className="btn btn-block btn-sm mt-2 border border-slate-700" disabled={loading}>
              
            {!loading?("SignUp"):(<span className='loading loading-spinner'></span>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
