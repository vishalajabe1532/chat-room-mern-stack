import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();
  // console.log(conversations)

  const handleSubmit= async(e)=>{
    e.preventDefault();

    if(!search) return;

    if(search.length <3){
      return toast.error("Search term must be atleast 3 characters long")
    }

    const conversation = conversations.find((c)=>c.fullname.toLowerCase().includes(search.toLowerCase()))

    // console.log(conversation)
    if(conversation){
      setSelectedConversation(conversation);
      setSearch("");
    }
    else{
      toast.error("No such user found");
    }

  }
  const handleChange= async(e)=>{
    e.preventDefault();
    setSearch(e.target.value);

    // if(!search) return;
    // if(search.length <3){
    //   return ;
    // }

    // const conversation = conversations.find((c)=>c.fullname.toLowerCase().includes(search.toLowerCase()))

    // // console.log(conversations)
    // if(conversation){
    //   setSelectedConversation(conversation);
      
    // }

  }

  return (
    <div>
      <form action="" className="flex items-center gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search.."
          className="input input-bordered rounded-full"
          value={search}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
          <FaSearch className=" h-6 w-6" />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
