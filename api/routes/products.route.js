import express from 'express';
import { create, getProducts } from '../controllers/products.controller.js';

const router = express.Router();

router.post('/create', create);
router.get('/getproducts',getProducts);

export default router;
