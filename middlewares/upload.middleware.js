import multer from "multer"
import {GridFsStorage} from "multer-gridfs-storage"
import dotenv from "dotenv"
dotenv.config()
const storage=new GridFsStorage({
    url:process.env.MONGO_DB_URL,
    options:{useNewUrlParser:true,useUnifiedTopology:true},
    file:(req,file)=>{
        const match=["image/png","image/jpg"];
        if(match.indexOf(file.mimeType)===-1){
            return `${Date.now()}-file-${file.originalname}`
        }
        return{
            bucketName:"photos",
            filename: `${Date.now()}-file-${file.originalname}`
        }
    }
})

export default multer({storage});