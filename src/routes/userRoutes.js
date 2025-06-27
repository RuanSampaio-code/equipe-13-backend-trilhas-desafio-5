import express from "express";
import UsersController from "../controllers/userController.js";

const router = express.Router();

router.get("/users", UsersController.getUsers);
router.post("/register", UsersController.registerUser);


// Exporta o router para ser usado no app principal
export default router;