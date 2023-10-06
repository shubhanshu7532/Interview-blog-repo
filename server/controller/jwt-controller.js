
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Token from '../model/token.js';

dotenv.config();

//1. Middleware to set up the verify for authentication 
export const authenticateToken = (request, response, next) => {

    //1. Taking authorization header
    const authHeader = request.headers['authorization'];

    //2. Finding out token from authorization header
    const token = authHeader && authHeader.split(' ')[1];
    
    //3. If token doesn't exist then we replying token is missing
    if (token == null) {
        return response.status(401).json({ msg: 'token is missing' });
    }

    //4. Jwt token verifying if token if valid then moving to next controller
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            return response.status(403).json({ msg: 'invalid token' })
        }

        request.user = user;
        next();
    })
}

//2. Controller to creating the new token
export const createNewToken = async (request, response) => {
    //1. Taking refresh token 
    const refreshToken = request.body.token.split(' ')[1];

    if (!refreshToken) {
        return response.status(401).json({ msg: 'Refresh token is missing' })
    }

    //2. Finding out real token using refresh token
    const token = await Token.findOne({ token: refreshToken });

    //3. If token is valid then we sending the errors
    if (!token) {
        return response.status(404).json({ msg: 'Refresh token is not valid'});
    }

    //4.Verifying my real token
    jwt.verify(token.token, process.env.REFRESH_SECRET_KEY, (error, user) => {
        if (error) {
            response.status(500).json({ msg: 'invalid refresh token'});
        }
        const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});

        return response.status(200).json({ accessToken: accessToken })
    })


}