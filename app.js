import express from "express"
import bodyParser from "body-parser" 
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config.js"


import {getUsers,postUsers,patchUsers,delUsers,getOneUser} from "./controllers/users.js"
import {getProducts,postProduct} from "./controllers/products.js"
const app = express()
app.use(express.static("./public"))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())


//Rotas usuario
app.get("/",getUsers)
app.get("/:userId",getOneUser)
app.post("/",postUsers)
app.patch("/:userId",patchUsers)
app.delete("/:userId",delUsers)

//Rotas produtos
app.get("/produto",getProducts)
app.post("/produto",postProduct)


//const DB_CONNECTION = "mongodb+srv://vitorpj:big070309@cluster0.fnzto.mongodb.net/users?retryWrites=true&w=majority"

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true},()=>{console.log("DB ON")})
app.listen(process.env.PORT || 3003)