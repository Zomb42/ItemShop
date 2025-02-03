import express from "express";

import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/product.js';

const router = express.Router();


router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct)

console.log(process.env.MONGO_URI);

//id is dynamic
router.delete("/:id", deleteProduct);

export default router;