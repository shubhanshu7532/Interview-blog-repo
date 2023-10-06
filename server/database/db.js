import mongoose from 'mongoose';

//Here i am doing  the configuration of connection with the db

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@blog.vppph2c.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;