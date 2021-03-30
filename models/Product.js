import mongoose from "mongoose"

const Product = mongoose.Schema({
    name:String,
    price:Number,
    categorie:String,
})

const ProductModel = mongoose.model("Product",Product)
export default ProductModel