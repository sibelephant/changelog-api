import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { HandleInputErrors } from "../middlewares/inputValidator";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../handlers/products";
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from "../handlers/update";


const router = Router()

//product
/**
 * Product
 */
router.get("/product", getProduct);

router.get("/product/:id", getProduct);

router.post("/product", body('name').isString(), HandleInputErrors,createProduct)

router.put("/product/:id", body('name').isString(), HandleInputErrors,updateProduct);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getUpdates);

router.get("/update/:id",getOneUpdate);
router.post("/update", body('title').exists().isString(), body('body').exists().isString(),body('productId').exists().isString(), createUpdate);

router.put("/update/:id", body('title').optional(), body('name').optional(), body('status').optional(), body('version').optional(), oneOf([body('status').equals('IN-PROGRESS').optional(), body('status').equals('SHIPPED').optional(), body('status').equals('DEPRECATED').optional()]), updateProduct);

router.delete("/update/:id", deleteUpdate);

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => { });

router.get("/updatepoint/:id", (req, res) => { });

router.post("/updatepoint", (req, res) => { });

router.put("/updatepoint/:id", body('name').optional().isString(), body('description').optional().isString(), (req, res) => { });

router.delete("/updatepoint/:id", (req, res) => { });


export default router