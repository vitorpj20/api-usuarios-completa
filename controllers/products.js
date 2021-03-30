import ProductModel from "../models/Product.js"

export const getProducts = async (req,res)=>{
    try {
        const products =  await ProductModel.find()
        res.status(200)
        res.json(products)
    }catch(error){
        res.status(404)
        res.json({message:error.message})
    }    
}
export const postProduct = async (req,res)=>{
        const {name,price,categorie} = req.body

        const product = new ProductModel({
            name:name,
            price:price,
            categorie:categorie
        })

    try {
        const saveProduct =  await product.save()
        res.status(200)
        res.json(saveProduct)
    }catch(error){
        res.status(404)
        res.json({message:error.message})
    }    
}