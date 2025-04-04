import express from "express";
import { check } from "express-validator";
import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/register",
  [
    check("username", "Username is required").trim().not().isEmpty(),
    check("email", "Please include a valid email").trim().isEmail(),
    check("password", "Password must be 6 or more characters").trim().isLength({ min: 6 }),
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("email", "Please include a valid email").trim().isEmail(),
    check("password", "Password is required").trim().not().isEmpty(),
  ],
  loginUser
);


export default router;
