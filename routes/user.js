import express from "express";
const router = express.Router();
import {findUserById, findAllUsers} from "../controllers/User.js"


router.get("/", async (req,res) => {
    try {
        const users  = await findAllUsers();
        return res.status(200).json({success:true, data: users, error:null})

    } catch (error) {
        console.error(error)
        res.status(500).json({success:false, data: null, error: error.message})
    }
})

router.get("/:userId", async (req,res) => {
    try {
        const {userId} = req.params;
        const user  = await findUserById(userId)
        if(!user){
            return res.status(204).json({success:false, data:null, error: "User Not Found"})
        }
        return res.status(200).json({success:true, data: user, error:null})

    } catch (error) {
        console.error(error)
        res.status(500).json({success:false, data: null, error: error.message})
    }
})

export default router