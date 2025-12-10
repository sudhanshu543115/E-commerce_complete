const jwtProvider = require('../config/jwtProvider');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ error: "Authorization header is required" });
        }

        const token = authHeader.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ error: "Token is required" });
        }

        // Verify the token and get user ID
        const userId = jwtProvider.getUserIdFromToken(token);
        
        if (!userId) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // Add user ID to request object
        req.userId = userId;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = {
    authenticateToken
};


