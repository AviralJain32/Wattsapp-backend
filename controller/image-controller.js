import grid from "gridfs-stream"
import mongoose from "mongoose"
import dotenv from "dotenv"

const conn=mongoose.connection;
let gfs,gridFsBucket;
conn.once('open',()=>{
    gridFsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    })
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection('fs')
})

dotenv.config()
const url=process.env.BACKEND_RUNNING_PORT 
// const url='http://localhost:8000'

export const uploadFile=async(req,res)=>{
    if(!req.file){
        return res.status(404).json(`File Not found`);
    }
    const imageUrl=`${url}/file/${req.file.filename}`
    return res.status(200).json(imageUrl)
}

export const getImage=async(req,res)=>{
    try {
        const file=await gfs.files.findOne({filename:req.params.filename})
        const readStream=gridFsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (err) {
        return res.status(500).json(err.message);
    }
}