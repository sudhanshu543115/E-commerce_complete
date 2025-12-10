
const userService = require("../services/user.service");
const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId; // From auth middleware
        const user = await userService.findUserById(userId);
        return res.status(200).send(user);
        
    } catch (error) {
        console.error("Error in getUserProfile:", error);
        res.status(400).json({ error: error.message });
    }
};






const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId; // From auth middleware
        const updateData = req.body;
        
        // Remove sensitive fields that shouldn't be updated
        delete updateData.password;
        delete updateData.role;
        delete updateData._id;
        
        const updatedUser = await userService.updateUserById(userId, updateData);
        return res.status(200).send(updatedUser);
        
    } catch (error) {
        console.error("Error in updateUserProfile:", error);
        res.status(400).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    getAllUsers
};
