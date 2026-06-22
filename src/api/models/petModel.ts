import fs from "fs";
import path from "path";

interface Pet {
  id: string;
  name: string;
  img: string;
  breed: string;
  gender: string;
  age: string;
  size: string;
  pet: string;
  about: string;
}

const dbPath = path.join(__dirname, "..", "pets.json");

function readPets(): Pet[] {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data).pets;
}

export { readPets, Pet };
