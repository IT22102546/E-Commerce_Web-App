import express from 'express';
import { create, deleteproduct, featureProduct, getFeaturedProducts, getProducts, unfeatureProduct, updateProduct} from '../controllers/products.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken, create);
router.get('/getproducts',getProducts);
router.put('/updateproduct/:productId/:userId', verifyToken, updateProduct)
router.delete('/deleteproduct/:productId/:userId', verifyToken, deleteproduct);
router.put('/featureproduct/:productId/:userId', verifyToken, featureProduct); 
router.put('/unfeatureproduct/:productId/:userId', verifyToken, unfeatureProduct); 
router.get('/featured', getFeaturedProducts);

export default router;
