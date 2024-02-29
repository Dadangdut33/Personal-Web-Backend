import { Router } from "express";

import { validateLoggedIn } from "../../controllers/v1/auth";
import {
  clickCountsOnly,
  createShortLink,
  deleteShortLink,
  getAllShortLinks,
  getOneShortLink_admin,
  getOneShortLink_public,
  getShortlinkStats,
  updateShortLink,
} from "../../controllers/v1/shortlink";

const r = Router();

// * Protected logged in
r.get("/stats", validateLoggedIn, getShortlinkStats);
r.get("/clickCounts", validateLoggedIn, clickCountsOnly);

// * Public
r.get("/:shorten", getOneShortLink_public); // ? query option: ?updateClick=1

// * Protected logged in
r.use(validateLoggedIn);
r.get("/", getAllShortLinks);
r.post("/", createShortLink);
r.get("/:_id/admin", getOneShortLink_admin);
r.put("/:_id", updateShortLink);
r.delete("/:_id", deleteShortLink);

export { r as shortlinkRouterV1 };
