const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Doctor = require("../models/Doctor");

dotenv.config();

// Token Blacklist with Expiry (Use Redis or Database in production)
let tokenBlacklist = new Map();

// Utility function to extract the token from the Authorization header
const extractToken = (req) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }
    return authHeader.split(" ")[1];
};

const authMiddleware = async (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Remove expired tokens from blacklist
    cleanupBlacklist();

    // Check if token is blacklisted
    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ error: "Token is invalid. Please log in again." });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Ensure `req.user.id` is explicitly set
        req.user = { id: decoded.id };

        // Check if the doctor exists in the database
        const doctor = await Doctor.findById(req.user.id);
        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }

        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

// Logout function (Adds token to blacklist with expiry)
const logout = (req, res) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(400).json({ error: "No token provided" });
    }

    // Add token to blacklist with expiry time (1 hour)
    const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour from now
    tokenBlacklist.set(token, expiryTime);

    res.status(200).json({ message: "Logged out successfully" });
};

// Remove expired tokens from blacklist
const cleanupBlacklist = () => {
    const now = Date.now();
    tokenBlacklist.forEach((expiry, token) => {
        if (expiry < now) {
            tokenBlacklist.delete(token);
        }
    });
};

module.exports = { authMiddleware, logout };
