import express from "express";
import { getAllPets, getPetById } from "../controllers/petsController";

const router = express.Router();

router.get("/", getAllPets);
router.get("/:id", getPetById);

export default router;
