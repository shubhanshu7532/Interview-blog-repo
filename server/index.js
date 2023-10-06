import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

//this is my database connection file
import Connection from './database/db.js';

//this is my router file
import Router from './routes/route.js';


//We are using a .env file so this configuration will help to access our .env files in which we all are storing our environment variables
dotenv.config();

const app = express();


// here i am implementing cross origin resource sharing as a middleware
app.use(cors());

// Here setting up the body parser as a middleware
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//Here i am setting up my router
app.use('/', Router);


// OUR SERVER WILL LISTEN ON THIS PORT
const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// CALLING A CONNECTION FUNCTIONALITY OF THE DATABASE
Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));