import express from "express";
import { createProducts, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getProducts)
router.post("/", createProducts)
router.delete("/:id", deleteProduct);
//if we are updating some fields then we wil use patch method and if we are update whole ffields then we will use put method
router.put("/:id", updateProduct);

export default router;