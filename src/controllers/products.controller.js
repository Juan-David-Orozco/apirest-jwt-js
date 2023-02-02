import Product from '../models/Product'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({message: "Get products", products})
  } catch (error) {
    res.status(500).json({error: error})
  }
}

export const createProduct = async (req, res) => {
  try {
    const {name, category, price, imgURL} = req.body
    const newProduct = new Product({name, category, price, imgURL})
    const savedProduct = await newProduct.save()
    res.status(201).json({message: "Create product", savedProduct}) 
  } catch (error) {
    res.status(500).json({error: error})
  }
}

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
    if(!product) return res.status(404).json({message: "Product not found"})
    res.status(200).json({message: "Get product", product})
  } catch (error) {
    res.status(500).json({error: error})
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId)
    if(!deletedProduct) return res.status(404).json({message: "Product not found"})
    res.status(204).json()
  } catch (error) {
    res.status(500).json({error: error})
  }
}

export const updateProduct = async (req, res) => {
  try {
    const {name, category, price, imgURL} = req.body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId, {name, category, price, imgURL}, {new: true}
    )
    if(!updatedProduct) return res.status(404).json({message: "Product not found"})
    res.status(200).json({message: "Update product", updatedProduct})
  } catch (error) {
    res.status(500).json({error: error})
  }
}