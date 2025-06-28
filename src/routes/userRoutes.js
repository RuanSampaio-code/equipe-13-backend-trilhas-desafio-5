import express from "express";
import UsersController from "../controllers/userController.js";
import { validateUserRegistration, verificarToken } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get("/users", UsersController.getUsers);
router.post("/register", UsersController.registerUser);

router.post('/login', UsersController.loginUser);

router.get('/usuarios', verificarToken, UsersController.getUsers);

// Exporta o router para ser usado no app principal
export default router;