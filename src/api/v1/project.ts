import { Router } from "express";

import { validateLoggedIn } from "../../controllers/v1/auth";
import * as cProject from "../../controllers/v1/project";

const r = Router();

// * Protected logged in
r.get("/stats", validateLoggedIn, cProject.getProjectStats); // * stats

// * public
r.get("/tags", cProject.getTagsOnly);
r.get("/", cProject.getAllProjects);
r.get("/:_id", cProject.getOneProject);

// * Protected logged in
r.use(validateLoggedIn);

r.post("/", cProject.createProject);
r.put("/:_id", cProject.updateProject);
r.delete("/:_id", cProject.deleteProject);

export { r as projectRouterV1 };
