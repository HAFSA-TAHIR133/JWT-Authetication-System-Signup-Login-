import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class GenerateTokens{
    async  generateAccessToken(user){
        return await jwt.sign(
            {id:user.id,role:user.role},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15s"}
        );
    };
    
    // refresh token
    async generateRefreshToken(user){
        return await jwt.sign(
            {id:user.id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"7d"}
        );
    };
}

export default new GenerateTokens();
