import express from "express";
const router = express.Router();
import { findUserByEmail, createUser } from "../controllers/User.js";

// Register route
router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists', success: false, data: null });
      }
      // Create new user
      const newUser = await createUser(name, email, password);
      return res.status(201).json({data: newUser, success: true, error: null});
    } catch (error) {
      return res.status(500).json({ error: 'Registration failed', success: false, data: null });
    }
  });

export default router