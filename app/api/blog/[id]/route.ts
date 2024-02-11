import BlogController from "../../_controllers/blog.controller";

export const GET = BlogController.getBlog;
export const PATCH = BlogController.editBlog;
export const DELETE = BlogController.deleteBlog;
