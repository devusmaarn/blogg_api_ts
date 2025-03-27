import { Router } from "express";
import Container from "typedi";
import { AuthController } from "./controller/auth.controller";
import { UserService } from "./service/user.service";

//Containers
const userService = new UserService();
const authController = new AuthController(userService);

//V1 Router
const r = Router();

// Auth Verification
r.post("/auth/register", (req, res) => authController.register(req, res));

export { r as v1Router };
