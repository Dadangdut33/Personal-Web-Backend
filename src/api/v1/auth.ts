import { Router } from "express";
import rateLimit from "express-rate-limit";

import { check, login, logout } from "../../controllers/v1/auth";

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 25, // Limit each IP to 25 requests per `window` (here, per 10 minutes)
});

const r = Router();

r.get("/", check);
r.post("/", limiter, login);
r.delete("/", logout);
// register is in user controller

export { r as authRouterV1 };
