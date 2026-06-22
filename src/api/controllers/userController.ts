// src/api/controllers/userController.ts
import { Request, Response } from "express";
import { loadUsers, User, writeUsers } from "../models/userModel";

export const createUser = (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const users = loadUsers();

  const newUser: User = {
    id: Math.random().toString(36).substring(2, 15),
    firstName,
    lastName,
    email,
    password,
  };

  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
};

export const getUserByEmail = (req: Request, res: Response): void => {
  const users = loadUsers();
  const user = users.find((u) => u.email === req.params.email);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json(user.id);
};
