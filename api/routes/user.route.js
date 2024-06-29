import express  from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { assignAdmin, deleteUser, forgetpassword, getAdmins, getCustomers, getUser, getUsers, resetpassword, resignAdmin, signout, test, updateResetPassword, updateUser } from "../controllers/user.controller.js";


const router = express.Router();

router.get('/test',test);
router.put("/update/:id" , verifyToken , updateUser);
router.delete("/delete/:id" , verifyToken , deleteUser);
router.put("/assignadmin/:id" , verifyToken , assignAdmin);
router.put("/resignadmin/:id" , verifyToken , resignAdmin);
router.get('/signout',signout);
router.get('/getadmins', getAdmins);
router.get('/getcustomers', getCustomers);
router.get('/getusers', verifyToken, getUsers);
router.post('/forgetpassword',forgetpassword);
router.get('/resetpassword/:id/:token',resetpassword);
router.post('/updateResetPassword/:id/:token',updateResetPassword);
router.get('/:userId', getUser);


export default router;