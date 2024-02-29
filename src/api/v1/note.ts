import { Router } from "express";

import { validateLoggedIn } from "../../controllers/v1/auth";
import { createNote, deleteNote, getAllNotes, getOneNote, updateNote } from "../../controllers/v1/note";

const r = Router();

// * Protected logged in
r.use(validateLoggedIn);

r.get("/", getAllNotes);
r.post("/", createNote);
r.get("/:_id", getOneNote);
r.put("/:_id", updateNote);
r.delete("/:_id", deleteNote);

export { r as noteRouterV1 };
