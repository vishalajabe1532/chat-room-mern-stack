import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { AuthContext, useAuthContext } from "../context/AuthContext"

const useSignup = () => {
  const [loading,setLoading] = useState(false)
    const {authUser,setAuthUser} = useAuthContext()


    const signup = async ({fullname,username,password,confirmPassword,gender})=>{
        const success = handleInputErrors({fullname,username,confirmPassword,password,gender})

        if(!success) return;

        setLoading(true)
        try{
            const res = await fetch("/api/auth/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({fullname,username,password,confirmPassword,gender})
            })
            const data = await res.json();
            console.log(data);
            if(data.error){
                throw new Error(data.error)
            }


            //local storage
            localStorage.setItem("chat-user",JSON.stringify(data))
            //update context
            setAuthUser(data)

            
        }
        catch(err){
            toast.error(err.message)
        }

        finally{
            setLoading(false);
        }
    }

    return {loading,signup};

}

export default useSignup


function handleInputErrors({fullname,username,confirmPassword,password,gender}){
    if(!fullname || !username || !gender || !password || !password){
        toast.error("Please fill all the fields")
        return flase
    }
    
    if(password !== confirmPassword){
        toast.error("Please re-confirm your password")
        return false
    }
    if(password.length <6){
        toast.error("Password length must be more than 6")
    }

    return true;
}