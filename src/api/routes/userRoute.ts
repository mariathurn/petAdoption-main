// src/api/routes/userRoute.ts
import express from "express";
import { createUser, getUserByEmail } from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);
router.get("/:email", getUserByEmail);

export default router;
