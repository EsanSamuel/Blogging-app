import BlogController from "../../_controllers/blog.controller";

export const POST = BlogController.ReplyBlogComment;
export const GET = BlogController.getBlogCommentsReply;
export const PATCH = BlogController.editBlogCommentReply;
export const DELETE = BlogController.deleteBlogCommentReply;
