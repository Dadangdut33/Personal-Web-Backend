import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import path from "path";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import "express-session";
declare module "express-session" {
	interface SessionData {
		userId: string;
		user: string;
	}
}
import { ___prod___ } from "./utils/constants";
import { NotFoundError } from "./utils/error/notFoundError";
import { ExpressErrorHandler } from "./utils/error/ExpressErrorHandler";
import { authRouterV1 } from "./api/v1/auth";
import { userRouterV1 } from "./api/v1/user";
import { shortlinkRouterV1 } from "./api/v1/shortlink";
import { blogRouterV1 } from "./api/v1/blog";
import { noteRouterV1 } from "./api/v1/note";
import { projectRouterV1 } from "./api/v1/project";

// --------------------------------------------------
dotenv.config(); // load env
const app = express();
const ttl = 24 * 60 * 60 * 1000 * 3; // 3 days
const sessionCfg: expressSession.SessionOptions = {
	secret: process.env.SESSION_SECRET!,
	cookie: { maxAge: ttl, secure: ___prod___, sameSite: ___prod___ ? "none" : "lax", httpOnly: false, domain: ___prod___ ? "dadangdut33.codes" : undefined },
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({
		// save session to db
		mongoUrl: process.env.MONGO_URI!,
		dbName: ___prod___ ? process.env.DB_NAME : process.env.DB_NAME + "_dev",
		collectionName: "sessions",
		ttl,
	}),
};
// --------------------------------------------------
// middleware
app.set("trust proxy", true);
app.use(morgan("dev")); // logger, use preset dev
app.use(helmet()); // security
app.use(
	cors({
		origin: ___prod___ ? ["https://dadangdut33.codes"] : true,
		methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
		credentials: true,
	})
); // cors (cross-origin resource sharing)
app.use(express.json()); // json parser / body parser for post request except html post form
app.use(express.urlencoded({ extended: false })); // urlencoded parser / body parser for html post form.
app.use(cookieparser()); // cookie parser
app.use(express.static(path.join(__dirname, "../public"))); // static files
app.use(expressSession(sessionCfg)); // session

// --------------------------------------------------
// API routes
// V1
app.use("/v1/auth", authRouterV1);
app.use("/v1/user", userRouterV1);
app.use("/v1/shortlink", shortlinkRouterV1);
app.use("/v1/blog", blogRouterV1);
app.use("/v1/note", noteRouterV1);
app.use("/v1/project", projectRouterV1);

// --------------------------------------------------
// ! Not found page error
app.all("*", NotFoundError);

// ! Error Handlers
app.use(ExpressErrorHandler);

export default app;
