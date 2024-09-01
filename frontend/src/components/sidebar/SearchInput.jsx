import React from 'react'
import { FaSearch } from "react-icons/fa";
const SearchInput = () => {
  return (
    <div>
        <form action="" className='flex items-center gap-2'>
            <input type="text" placeholder='Search..' className='input input-bordered rounded-full'/>
            <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <FaSearch className=' h-6 w-6' />
            </button>
        </form>
    </div>
  )
}

export default SearchInput