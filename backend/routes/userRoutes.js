import express from "express";
const router = express.Router();


import UserController from "../controllers/userControllers.js";
import { authenticateToken, authorizeRole } from "../middlewares/authMiddleware.js";


// --- AUTH ROUTES ---
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/refresh", UserController.refreshToken);
router.post("/logout", UserController.logout);
//  logged-in user can access this page
router.get('/profile', authenticateToken, (req, res) => {
 res.send(`This is your profile data. Welcome User ID: ${req.user.id}`);
});

// Only admins can access this page
router.get('/admin', authenticateToken, authorizeRole("admin"), (req, res) => {
    res.send("Welcome Admin!! This is the admin dashboard.");
});

export default router;
