const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser')

mongoose.connect("mongodb://localhost:27017/learnrestapi").then(()=>{
    console.log("i am mongo db speaking")
}).catch((err)=>{
    console.log(err)
})





const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const productSchema = new mongoose.Schema({
    name : String ,
    description : String ,
    price : Number
})


// api for create new product 
const Product = new mongoose.model("Learn1" , productSchema);

app.post("/api/v1/product/new" , async (req ,res) => {
   const product = await new Product(req.body).save()
    res.status(200).json({
        success: true ,
        product
    })
})


// read all products 
app.get("/api/v1/products" , async (req , res) => {
    const products = await Product.find();

    res.status(200).json({
        success : true , 
        products
    })
})


// updating product 
app.put("/api/v1/product/:id" , async (req , res) => {
    let product = await Product.findById(req.params.id);

    product = await Product.findByIdAndUpdate(req.params.id , req.body , {
        new: true ,
        useFindAndModify: true ,
        useValidators: true
    })

    res.status(200).json({
        success: true ,
        product
    })
})



// deleting product
app.delete("/api/v1/product/:id" , async (req , res) => {
    
    let product = await Product.findByIdAndDelete(req.params.id);

    if(!product)
    {
        return res.status(404).json({
            success: false ,
            message: "requested product does not exist"
        })
    }

    // await product.remove(); 

    res.status(200).json({
        success: true ,
        message: "product is deleted"
    })

})



app.listen(5000 , () => {
    console.log("i am working http://localhost:5000");
})
