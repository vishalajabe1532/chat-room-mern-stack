import { useEffect, useState } from "react"
import toast from 'react-hot-toast'


const useGetConversations = () => {
  const [loading,setLoading] = useState(false)
  const [conversations,setConversations] = useState([]);
  // console.log("useGetConversations running");

  

  useEffect(()=>{
    const getConversations = async ()=>{
        // console.log("conversation data fetched")
        setLoading(true)
        try{
            const res = await fetch('/api/users');

            const data = await res.json();

            if(data.error){
              throw new Error(data.error);
            }
            setConversations(data);

        }
        catch(err){
          toast.error(err.message)
        }
        finally{
            setLoading(false)
        }
    }

    getConversations();
  },[])



  return {loading,conversations};
}

export default useGetConversations