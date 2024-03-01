import express from 'express';
import { register, login, logout, myProfile } from '../controllers/userController.js';


const router = express.Router()

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', myProfile);

export default router;