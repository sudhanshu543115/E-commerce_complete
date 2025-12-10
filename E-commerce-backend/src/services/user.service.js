const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider =require ("../config/jwtProvider");


const createUser= async(userData)=>{
    try {
        let {firstName, lastName, email, password, mobile} = userData;
          
        const isUserExist=await User.findOne({email});

        if(isUserExist){
            throw new Error("User already exists with this email");
        }

        password = await bcrypt.hash(password, 10);

        const user =  await User.create({
            firstName,
            lastName,
            email,
            password,
            mobile: userData.mobile
        });
        console.log("User created successfully",user);
        return user;
        
    } catch (error) {
        console.error("Error in createUser:", error);
        throw new Error("Error creating user");
    }



}

const findUserById=async(userId)=>{
    try {
        const user = await User.findById(userId).populate("address");
        if (!user) {
            throw new Error("User not found with this ID");
        }
        return user;
    } catch (error) {
        throw new Error("Error fetching user");
    }
}


const getUserByEmail=async(email)=>{
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found with this email", email);
        }
        return user;
    } catch (error) {
        throw new Error("Error fetching user", error);
    }
}


//   get user profile by token

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await findUserById(userId);
        if (!user) {
            throw new Error("User not found with this token");
        }
        return user;
    } catch (error) {
        throw new Error("Error fetching user profile");
    }
};


const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error("Error fetching users", error);
    }
};

const updateUserById = async (userId, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!user) {
            throw new Error("User not found");
        }
        
        return user;
    } catch (error) {
        throw new Error("Error updating user");
    }
};

const comparePasswords = async (plainPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        throw new Error("Error comparing passwords");
    }
};

module.exports = {
    createUser, findUserById, getUserByEmail, getUserProfileByToken, getAllUsers, comparePasswords, updateUserById
};