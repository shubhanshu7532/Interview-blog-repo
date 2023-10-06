import grid from 'gridfs-stream';
import mongoose from 'mongoose';

//1.Setting up my local host url
const url = 'http://localhost:8000';

//2.setting up grif gfs bucket for uploading the images
let gfs, gridfsBucket;
const conn = mongoose.connection;

//3.Firing the open evet emitter
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});




//Middleware to upload the images
export const uploadImage = (request, response) => {
    console.log(request.body)
    if(!request.file) 
        return response.status(404).json("File not found");
    
    const imageUrl = `${url}/file/${request.file.filename}`;

    response.status(200).json(imageUrl);    
}

//Controller to get the images
export const getImage = async (request, response) => {
    try {   
        //1. Finding file from gfs bucket
        const file = await gfs.files.findOne({ filename: request.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(response);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}