import BlogController from "../../_controllers/blog.controller";

export const POST = BlogController.saveBlog;
export const GET = BlogController.getSavedBlogs;
export const DELETE = BlogController.unSaveBlog;
