import { z } from "zod";

export const userValidation = z.object({
  username: z.string().min(1, {
    message: "username too short",
  }),
  image: z.string().min(1, {
    message: "Value too short",
  }),
});

export type userType = z.infer<typeof userValidation>;

export const commentValidation = z.object({
  userId: z.string().min(1, {
    message: "Value too short",
  }),
  comment: z.string(),
});

export type commentType = z.infer<typeof commentValidation>;

export const editCommentValidation = z.object({
  comment: z.string().min(1, {
    message: "Value too short",
  }),
});

export type editCommentType = z.infer<typeof editCommentValidation>;

export const blogValidation = z.object({
  userId: z.string().min(1, {
    message: "userId too short",
  }),
  title: z.string().min(1, {
    message: "Title too short",
  }),
  image: z.string().min(1, {
    message: "Image too short",
  }),
  firstParagraph: z.string().min(1, {
    message: "firstParagraph too short",
  }),
  firstContent: z.string().min(1, {
    message: "firstContent too short",
  }),
  secondContent: z.string().min(1, {
    message: "secondContent too short",
  }),
  secondParagraph: z.string().min(1, {
    message: "secondParagraph too short",
  }),
  thirdParagraph: z.string().min(1, {
    message: "thirdParagraph too short",
  }),
  thirdContent: z.string().min(1, {
    message: "thirdContent too short",
  }),
  category: z.enum([
    "Web development",
    "Mobile development",
    "AI & ML",
    "Data science",
    "Blockchain",
  ]),
});

export type blogType = z.infer<typeof blogValidation>;

export const nicknameValidation = z.object({
  nickname: z.string().min(1, {
    message: "nickname too short",
  }),
  jobtype: z.enum([
    "Frontend developer",
    "UI/UX designer",
    "Backend developer",
    "Software engineer",
    "Cyber Security expert",
  ]),
  bio: z.string(),
});

export type nicknameType = z.infer<typeof nicknameValidation>;

export const replyValidation = z.object({
  userId: z.string().min(1, {
    message: "Value too short",
  }),
  reply: z.string(),
});

export type replyType = z.infer<typeof replyValidation>;

export const editReplyValidation = z.object({
  reply: z.string(),
});

export type editReplyType = z.infer<typeof editReplyValidation>;
