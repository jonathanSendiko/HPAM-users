import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import config from "../config.js";

const salt = 10;

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    // Pass the error to the calling routes function
    throw error;
  }
};

const findAllUsers = async () => {
  try {
    const users = await User.findAll({attributes:{exclude:['password', 'createdAt', 'updatedAt']}});
    return users;
  } catch (error) {
    // Pass the error to the calling routes function
    throw error;
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {attributes:{exclude:['password', 'createdAt', 'updatedAt']}});
    return user;
  } catch (error) {
    // Pass the error to the calling routes function
    throw error;
  }
};

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
    const accessToken = jwt.sign({ userId: newUser.id, role: newUser.role }, config.secret_key, {
      expiresIn: "60m",
    });
    const refreshToken = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      config.secret_refresh_key,
      { expiresIn: "90d" }
    );

    return {
      user_id: newUser.id,
      token: { access_token: accessToken, refresh_token: refreshToken },
    };
  } catch (error) {
    // Pass the error to the calling routes function
    throw error;
  }
};


const updateUserById = async (userId, name, email,status) => {
  try {
    const user = await User.findByPk(userId);
    if(!user){
      throw new Error("User Not Found")
    }
    await user.update({
      name,
      email,
      status
    })
  } catch (error) {
    // Pass the error to the calling routes function
    if(error.message = "User Not Found"){
      throw error;
    }
    throw new Error("Failed to update User");
  }
};

const authorizeUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User Not Found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid password");
    }

    const accessToken = jwt.sign({ userId: user.id, role: user.role }, config.secret_key, {
      expiresIn: "60m",
    });
    const refreshToken = jwt.sign(
      { userId: user.id, role: user.role },
      config.secret_refresh_key,
      { expiresIn: "90d" }
    );

    return {
      token: { access_token: accessToken, refresh_token: refreshToken },
    };
  } catch (error) {
    // Pass the error to the calling routes function
    throw error;
  }
};

const refreshAccess = (refreshToken) => {
  let result = null
  jwt.verify(refreshToken, config.secret_refresh_key, (err, decoded) => {
    if (err) {
      throw new Error("Refresh Token Failed");
    }
    const accessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      config.secret_key,
      { expiresIn: "60m" }
    );
    result  = {token: {access_token: accessToken}}
  });
  return result
};

export { createUser, findUserByEmail, authorizeUser, refreshAccess, findUserById, findAllUsers, updateUserById };
