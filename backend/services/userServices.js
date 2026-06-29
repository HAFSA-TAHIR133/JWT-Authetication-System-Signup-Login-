import {Users} from '../models/users.js';
import bcrypt from 'bcrypt';



class UserService{
    async findUserByEmail(email){
        return Users.findOne({where:{email}})
        
    }
    // get a single product
    async createUser(name,email,password,role='user'){
        // hash passowrd
        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // generate new  user
        const newUser=await Users.create({
            name,
            email,
            password:hashedPassword,
            role
        });
        return newUser
        
    }

    // create product
    async validatePassword(plainPassword,hashedPassword){
        return await bcrypt.compare(plainPassword, hashedPassword);    }
}

export default new UserService();