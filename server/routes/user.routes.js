import express from 'express'
import auth from '../middleware/auth.middleware.js';
import { login, signup, getAllUsers, getUser,postUserData, deleteUser } from '../controller/user.controller.js';
const router = express.Router();


router.post('/signup',signup)
router.post('/login',login)
router.get('/getAllUsers',getAllUsers);
router.get("/:id",getUser);
router.patch("/update/:id",auth,postUserData)
router.delete("/delete/:id",deleteUser)

export default router;