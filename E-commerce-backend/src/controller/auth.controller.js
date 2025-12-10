
const userService = require('../services/user.service');
const jwtProvider = require('../config/jwtProvider');
const bcrypt = require('bcrypt');
const cartService = require('../services/cart.service');





const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id);
        

       // await cartService.createCart(user._id);
        res.status(200).send({ jwt, message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await userService.comparePasswords(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }



        const jwt = jwtProvider.generateToken(user._id);
        res.status(200).send({ jwt, message: "User logged in successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const { token } = req.body;
        jwtProvider.invalidateToken(token);
        res.status(200).send({ message: "User logged out successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    register,
    login
    
};
