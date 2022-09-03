import { Router } from "express";
import { validateLoggedIn } from "../../controllers/v1/auth";
import * as cBlog from "../../controllers/v1/blog";

const r = Router();

// * revision is automatically created when a blog post is updated
r.get("/revision", validateLoggedIn, cBlog.getAllBlogRevisions); // query blogId to get by eventId
r.get("/revision/:_id", validateLoggedIn, cBlog.getOneBlogRevision);
r.put("/revision/:_id", validateLoggedIn, cBlog.updateBlogRevision);
r.delete("/revision/:_id", validateLoggedIn, cBlog.deleteBlogRevision);

// * stats
r.get("/stats", validateLoggedIn, cBlog.getPostStats);

// * public get blog
r.get("/tags", cBlog.getTagsOnly);
r.get("/", cBlog.getAllBlogs);
r.get("/:_id", cBlog.getOneBlog);

// * Protected logged in
r.use(validateLoggedIn);
r.post("/", cBlog.createBlog);
r.get("/:_id/revision", cBlog.getBlogRevisionsByBlogId);
r.put("/:_id", cBlog.updateBlog);
r.delete("/:_id", cBlog.deleteBlog);

export { r as blogRouterV1 };
