import UserModel from "../models/User.js"
import multer from "multer"
import path from "path"
//video
//https://www.youtube.com/watch?v=MkkbUfcZUZM&t=51s&ab_channel=Rocketseat
//tempo 
//31:52
import multerS3 from "multer-s3"
import aws from "aws-sdk"



//========================================================================================

//MULTER

const storageType = {
    local:multer.diskStorage({
        destination:"./public/uploads/",
        filename: function (req,file,cb){
            cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
        }
    }),
    s3:multerS3({
        s3: new aws.S3(),
        bucket: "uploadexample20",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl:"public-read",
        key:function (req,file,cb){
            cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
        }
    })
}
const storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename: function (req,file,cb){
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const S3 = multerS3({
    s3: new aws.S3(),
    bucket: "uploadexample20",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl:"public-read",
    key:function (req,file,cb){
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({
    storage:storageType["s3"],
    limits:{fileSize:100000000},
    fileFilter:function (req,file,cb){
        checkFileType(file,cb)
    }
}).single("imagem")



//FUNCAO PARA RETRINGIR ARQUIVOS QUE NAO SEJAM DE IMG
function checkFileType(file,cb){
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null,true)
    }else{
        cb("Error: images only")
    }
}

//========================================================================================


export const getUsers =  async (req,res)=>{
    try{
        const users = await UserModel.find()
        res.status(200)
        res.json(users)
    }catch(error){
        res.status(404)
        res.json({message:error.message})
    }
}

export const getOneUser = async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.userId)
        res.status(200)
        res.json(user)
    }catch(error){
        res.status(404)
        res.json({message:error.message})
    }
}

export const  postUsers =  (req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.json({message:err})
        }else{
        if(res.file == "undefined"){
            res.json({message:"imagem nao enviada"})
        }else{
            const file = `uploads/${req.file.filename}`
            const {name,city,age,profession} = req.body
            const {location : url = ""} = req.file
            const user = new UserModel({
            name:name,
            city:city,
            age:age,
            profession:profession ,
            img:file,
            nameImage:req.file.originalname,
            size:req.file.size,
            key:file,
            url,     
            })
        try{
            const saveUser =  user.save()
            res.status(200)
            res.json(user)
        }catch(error){
            res.json({message:error.message})
        }
        }
        }
    }) 
}


export const patchUsers = async (req,res)=>{
    try{
        const updateUser = await UserModel.updateOne(
            {_id:req.params.userId},
            {$set:{profession:req.body.profession}}
        )
            res.status(200)
            res.json(updateUser)
        }catch(error){
            res.json({message:error.message})
        }
}

export const delUsers = async(req,res)=>{
    try{
        const deleteUser = await UserModel.remove({_id:req.params.userId})
        res.json(deleteUser)
    }catch(error){
        res.json({message:error.message})
    }
}
//re605caa92c7f729a193c2650a
//d605cb17edf23b2a38af1575b