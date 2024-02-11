import BlogController from "../../_controllers/blog.controller";

export const POST = BlogController.createBlogComment;
export const GET = BlogController.getBlogComments;
export const PATCH = BlogController.editBlogComment;
export const DELETE = BlogController.deleteBlogComment;
