import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Token from '../model/token.js'
import User from '../model/user.js';

dotenv.config();

//1. Controller to signup the user
export const singupUser = async (request, response) => {
    try {
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(request.body.password, salt);
        //1. Here we are hashing the user password
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        //2. Making user payload to create the user
        const user = { username: request.body.username, name: request.body.name, password: hashedPassword }

        //3. Creating the new user
        const newUser = new User(user);
        await newUser.save();

        //4. Signup is successfull
        return response.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
}


//2.Controller to login the user
export const loginUser = async (request, response) => {
    //1.Finding the user exist or not
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        //2. Comparing my real encrypted password with the password that is entered by user using bcrypt library
        let match = await bcrypt.compare(request.body.password, user.password);

        //3.if  password matches then we generating a new token and sending it in response other wise we throw error response that password doesn't matching
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, username: user.username });
        
        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
}


//3. Controller to logout the user
export const logoutUser = async (request, response) => {
    const token = request.body.token;
    await Token.deleteOne({ token: token });

    response.status(204).json({ msg: 'logout successfull' });
}