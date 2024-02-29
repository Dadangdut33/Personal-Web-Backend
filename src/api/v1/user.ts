import { Router } from "express";

import { validateLoggedIn } from "../../controllers/v1/auth";
import {
  changePassword,
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser_protected,
  getOneUser_public,
  updateUserData,
} from "../../controllers/v1/user";

const r = Router();

// * Public
r.get("/:username", getOneUser_public);

// * Protected logged in
r.use(validateLoggedIn);

r.get("/", getAllUsers);
r.post("/", createUser);
r.put("/:_id", updateUserData);
r.delete("/:_id", deleteUser);
r.put("/:_id/password", changePassword);
r.get("/:_id/admin", getOneUser_protected);

export { r as userRouterV1 };
