import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrder, getOrdersByCustomerId,updateOrder} from '../controllers/order.controller.js';

const router = express.Router();

// Customer order handling routes
router.post('/create', createOrder);
router.get('/getorders', getAllOrders);
router.get('/getorder/:id', getOrder);
router.delete('/deleteorder/:id', deleteOrder);
router.put('/updateorder/:id', updateOrder);
router.get("/customer/:id", getOrdersByCustomerId);



export default router;
