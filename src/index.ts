import "express-async-errors";
import http from "http";
import mongoose from "mongoose";

import app from "./app";
import { ___prod___ } from "./utils/constants";

const onError = (error: NodeJS.ErrnoException, port: string | number) => {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

(async () => {
  try {
    // --------------------------------------------------
    // check env
    if (!process.env.SESSION_SECRET) throw new Error('??>> {" SESSION_SECRET must be defined!! "} ');
    if (!process.env.MONGO_URI) throw new Error('??>> {" MONGO_URI must be defined!! "} ');
    // --------------------------------------------------
    // connect to mongo
    const prodInDev = process.env.USE_PROD_DB_IN_DEV === "true";
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: ___prod___ ? process.env.DB_NAME : prodInDev ? process.env.DB_NAME : process.env.DB_NAME + "_dev",
    });
    mongoose.set("debug", ___prod___);
    mongoose.pluralize(null); // disable pluralize
    // --------------------------------------------------
    const server = http.createServer(app);
    const port = process.env.PORT || 42069;
    server.listen(port, () => {
      console.log(`~~~~ Server Started ~~~~`);
      console.log(`Mode: ${___prod___ ? "Production" : "Development"}`);
      console.log(`Use prod DB in dev: ${prodInDev}`);
      if (!___prod___) {
        console.log(`VISIT: http://localhost:${port}`);
      }
    });
    server.on("error", (error: NodeJS.ErrnoException) => onError(error, port));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();
