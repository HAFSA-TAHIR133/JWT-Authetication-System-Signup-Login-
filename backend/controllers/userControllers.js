import UserService from '../services/userServices.js';
import GenerateTokens from '../TokensGenerated/tokens.js';
import jwt from 'jsonwebtoken';

class UserController {
    // 1. SIGNUP
    async signup(req, res, next) {
        try {
            const { name,email, password, role } = req.body;
            
            const existingUser = await UserService.findUserByEmail(email);
            if (existingUser) return res.status(400).send("User already exists");

            const newUser = await UserService.createUser(name,email, password, role);
            
            // Don't return the password
            const { password: pwd, ...userWithoutPassword } = newUser;
            res.status(201).json({ message: "User created successfully", user: userWithoutPassword });
        } 
        catch (error) {
            next(error);
        }
    }

    // 2. LOGIN
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await UserService.findUserByEmail(email);
            if (!user) return res.status(400).send("User not found");

            const isMatch = await UserService.validatePassword(password, user.password);
            if (!isMatch) return res.status(401).send("Wrong password");

            const accessToken = await GenerateTokens.generateAccessToken(user);
            const refreshToken = await GenerateTokens.generateRefreshToken(user);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,// Set to true in production
                sameSite: "lax",// Modern CSRF shield! Stops browsers from sending cookies on sneaky external clicks
                 maxAge: 24 * 60 * 60 * 1000 
            });

            res.status(200).json({ accessToken, user: { id: user.id, role: user.role } });
        } 
        catch (error) {
            next(error);
        }
    }

    // 3. REFRESH TOKEN
    async refreshToken(req, res, next) {
        try {
            const token = req.cookies.refreshToken;
            if (!token) return res.status(401).send("No refresh token provided");

            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
                if (err) return res.status(403).send("Invalid refresh token");

                const accessToken = await GenerateTokens.generateAccessToken({
                    id: user.id,
                    role: user.role || "user"
                });

                res.status(200).json({ accessToken });
            });
        } 
        catch (error) {
            next(error);
        }
    }

    // 4. LOGOUT
    async logout(req, res, next) {
        try {
            res.clearCookie("refreshToken");
            res.status(200).send("Logged out successfully");
        } 
        catch (error) {
            next(error);
        }
    }
}

export default new UserController();