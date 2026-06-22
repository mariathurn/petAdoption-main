import { Request, Response } from "express";
import { readPets } from "../models/petModel";

export const getAllPets = (req: Request, res: Response) => {
  const pets = readPets();
  res.json(pets);
};

export const getPetById = (req: Request, res: Response) => {
  const pets = readPets();
  const pet = pets.find((p) => p.id === req.params.id);
  pet ? res.json(pet) : res.status(404).json({ message: "Pet not found" });
};
