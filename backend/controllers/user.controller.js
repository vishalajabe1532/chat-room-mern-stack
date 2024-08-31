import User from "../models/user.model.js";





export const getUsersForSidebar = async (req,res)=>{
    console.log(`getUsers for sidebar route`);

    try{
        const userId = req.user._id;

        const users = await User.find({_id : {$ne : userId}}).select("-password");

        // console.log(users);
        if(!users) return res.status(200).json([]);


        return res.status(200).json(users);
    }
    catch(err){
        console.log(`Error in getUsersForSidebar ${err.message}`)
        res.status(500).json({error:"Internal server error"});
    }
}