import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js";
import config from "../config.js";


const salt = 10 

const findUserByEmail = async (email) => {
    try {
        const user  = await User.findOne({where: {email}});
        if(user){
            return true
        }
        return false
    } catch (error) {
        console.error({error, message: "Failed to find user by email"})
    }
}

const createUser = async (name, email, password) => {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create the user in the postgresql
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      // Generate a JWT token
      const token = jwt.sign({ userId: newUser.id }, config.secret_key);
  
      return { userId: newUser.id, token };
    } catch (error) {
      console.error({error: error, message: "Failed to create user"})
    }
  };

  export {
    createUser,
    findUserByEmail
  }