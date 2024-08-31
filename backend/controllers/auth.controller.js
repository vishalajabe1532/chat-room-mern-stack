import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";




export const signup = async (req,res)=>{
    try{
        console.log("signup route")
        
        const {fullname,username,password,confirmPassword,gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords don't match"})
        }

        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({error:"Username already exits"})
        }

        //hash password here
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt);

        //https://avatar-placeholder.iran.liara.run/
        // https://avatar.iran.liara.run/public/boy?username=Scott

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        

        
        const newUser = await User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender==="male" ? boyProfilePic : girlProfilePic

        })

        if(newUser){
            //generate JWT tokens
            generateTokenAndSetCookie(newUser._id,res);


            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                username:newUser.username,
                profilePic:newUser.profilePic
            });
        }
        else{
            res.status(400).json({error:"Invalid User data"});
        }

    }
    catch(err){
        console.log(`Error in signup controller : ${err.message}`);
        res.status(500).json({error:"Internal Server Error"})
    }
}






export const login = async (req,res)=>{
    console.log("login route")
    try{
        const {username,password} = req.body;

        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({error:"Username does not exists"})
        }
        else{
            if(!bcrypt.compareSync(password,user.password)){
                res.status(400).json({error:"Incorrect Password"});
            }
            else{
                // everything fine
                generateTokenAndSetCookie(user._id,res);

    
                res.status(200).json({
                    _id:user._id,
                    fullname:user.fullname,
                    username:user.username,
                    profilePic:user.profilePic
                });
            }
            

        }
        




    }
    catch(err){
        console.log(`An error in login controller : ${err.message}`)
        res.status(500).json({error:"Internal server error"});
    }
}


export const logout = (req,res)=>{
    console.log("logout route")
    
     

    try{

        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})

    }
    catch(err){
        console.log(`An error in logout controller : ${err.message}`)
        res.status(500).json({error:"Internal server error"});
    }
}


