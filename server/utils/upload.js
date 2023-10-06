import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from 'mongoose';

const mongoURI =`mongodb+srv://shubhanshu09:shubhanshu@blog.vppph2c.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`
const promise = mongoose.connect(mongoURI, { useNewUrlParser: true });

// const conn = mongoose.connection;
// let gfs;

// conn.once('open',() => {
//   gfs = Grid(conn, mongoose.mongo);
//   gfs.collection('uploads');
// });

const storage = new GridFsStorage({
   db:promise,
    
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];
        console.log("coming into file")

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 