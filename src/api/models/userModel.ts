import fs from "fs";
import path from "path";

const userFilePath = path.join(__dirname, "../users.json");

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function loadUsers(): User[] {
  const raw = fs.readFileSync(userFilePath, "utf-8");
  return JSON.parse(raw).users || [];
}

function writeUsers(users: User[]) {
  fs.writeFileSync(userFilePath, JSON.stringify({ users }, null, 2));
}

export { writeUsers, loadUsers };
