import express from 'express';
import { create, getProducts } from '../controllers/products.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken, create);
router.get('/getproducts',getProducts);

export default router;
