import express from "express";
const router = express.Router();
import {findUserByEmail, authorizeUser, createUser, refreshAccess} from "../controllers/User.js"

// Register route
router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists', success: false, data: null });
      }
      // Create new user
      const newUser = await createUser(name, email, password);
      return res.status(201).json({data: newUser, success: true, error: null});
    } catch (error) {
      console.error(error)  
      return res.status(500).json({ error: 'Registration failed', success: false, data: null });
    }
  });

router.post("/login", async(req,res) => {
    try {
        const {email,password}  = req.body;
        const user = await authorizeUser(email, password);
        return res.status(200).json({data: user, success:true, error:null})
    } catch (error) {
        if(error.message == "User Not Found"){
            return res.status(401).json({error: error.message, success:false, data:null})
        } else if(error.message == "Invalid password"){
          return res.status(401).json({error: error.message, success:false, data:null})
        }
        console.error(error)
        return res.status(500).json({error: error, success: false, data: null})
    }
})

router.post("/refresh", async(req, res) => {
  try {
    const {refresh_token} = req.body
    const token = refreshAccess(refresh_token)
    return res.status(200).json({data: token, success:true, error: null})
  } catch (error) {
    console.error(error)
    return res.status(403).json({success: false, error: error.message, data: null})
  }
})

export default router