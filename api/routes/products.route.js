import express from 'express';
import { create, deleteproduct, getProducts, updateProduct} from '../controllers/products.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken, create);
router.get('/getproducts',getProducts);
router.put('/updateproduct/:productId/:userId', verifyToken, updateProduct)
router.delete('/deleteproduct/:productId/:userId', verifyToken, deleteproduct);

export default router;
