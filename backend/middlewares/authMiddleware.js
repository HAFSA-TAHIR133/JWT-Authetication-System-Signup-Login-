import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// check login status for each page
export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) return res.status(401).send("Access Denied: No Token Provided!");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("Invalid or Expired Token");
        req.user = user; 
        next();
    });
}

export function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send("Access denied: Insufficient permissions");
        }
        next();
    };
}