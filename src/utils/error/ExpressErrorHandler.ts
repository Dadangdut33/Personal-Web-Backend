import { NextFunction, Request, Response } from "express";

import { getDataStatus } from "./templateError";

const ExpressErrorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { statusCode, dataErr } = getDataStatus(res, err);
  res.status(statusCode).json(dataErr);

  next();
};

export { ExpressErrorHandler };
