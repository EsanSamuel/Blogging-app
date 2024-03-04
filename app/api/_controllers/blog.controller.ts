//Controller backend code for the blog functionality
import connectDB from "@/lib/connect";
import {
  blogType,
  blogValidation,
  commentType,
  commentValidation,
  editCommentType,
  editCommentValidation,
  editReplyType,
  editReplyValidation,
  replyType,
  replyValidation,
  saveType,
  saveValidation,
} from "@/lib/validation";
import Blog from "@/models/blog.model";
import BlogComment from "@/models/comment.model";
import Like from "@/models/like.model";
import BlogReply from "@/models/reply.model";
import Save from "@/models/save.modal";
import { ApiError, ApiSuccess } from "@/utils/ApiResponse";
import { v2 as cloudinary } from "cloudinary";

//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//defining the types for params
type Params = {
  params: {
    id: string;
  };
};

class BlogController {
  //create blog
  static async createBlog(request: Request) {
    const validate = blogValidation.parse(await request.json());
    const {
      userId,
      title,
      image,
      firstParagraph,
      firstContent,
      secondContent,
      secondParagraph,
      thirdParagraph,
      thirdContent,
      category,
      theme,
    }: blogType = validate;
    try {
      connectDB();
      const ImageUrl = await cloudinary.uploader.upload(image);
      const newBlog = new Blog({
        author: userId,
        title,
        image: ImageUrl.url,
        firstParagraph,
        firstContent,
        secondContent,
        secondParagraph,
        thirdParagraph,
        category,
        thirdContent,
        theme,
      });
      await newBlog.save();
      return new Response(
        JSON.stringify(new ApiSuccess(201, "Blog created!", newBlog)),
        { status: 201 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //get all blogs
  static async getBlogs(request: Request) {
    try {
      connectDB();
      const getblogs = await Blog.find({}).populate("author");
      return new Response(
        JSON.stringify(new ApiSuccess(200, "Blogs fetched!", getblogs)),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //get a specific blog
  static async getBlog(request: Request, { params }: Params) {
    try {
      connectDB();
      const getblog = await Blog.findById(params.id).populate("author");
      return new Response(
        JSON.stringify(new ApiSuccess(200, "Blogs fetched!", getblog)),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //delete a specific blog
  static async deleteBlog(request: Request, { params }: Params) {
    try {
      connectDB();
      const deleteblog = await Blog.findByIdAndDelete(params.id);
      return new Response(
        JSON.stringify(new ApiSuccess(200, "Blog deleted!", deleteblog)),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //edit a specific blog
  static async editBlog(request: Request, { params }: Params) {
    const {
      image,
      firstParagraph,
      firstContent,
      secondContent,
      secondParagraph,
      thirdParagraph,
      thirdContent,
      category,
      theme,
      title,
    } = await request.json();
    try {
      connectDB();
      const ImageUrl = await cloudinary.uploader.upload(image);
      const blog = await Blog.findById(params.id);
      blog.image = ImageUrl.url;
      blog.title = title;
      blog.firstParagraph = firstParagraph;
      blog.firstContent = firstContent;
      blog.secondContent = secondContent;
      blog.secondParagraph = secondParagraph;
      blog.thirdParagraph = thirdParagraph;
      blog.thirdContent = thirdContent;
      blog.category = category;
      blog.theme = theme;

      await blog.save();
      return new Response(
        JSON.stringify(new ApiSuccess(201, "Blogs fetched!", blog)),
        { status: 201 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //get blogs created by user logged in
  static async getUserBlog(request: Request, { params }: Params) {
    try {
      connectDB();
      const getuserblog = await Blog.find({ author: params.id }).populate(
        "author"
      );
      return new Response(
        JSON.stringify(new ApiSuccess(200, "Blog fetched!", getuserblog)),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  static async getRelatedBlog(request: Request, { params }: Params) {
    try {
      connectDB();
      const blogs = await Blog.find({}).populate("author");
      const blog = await Blog.findById(params.id).populate("author");
      const getRelated = blogs.filter(
        (item) => item.category === blog.category
      );
      return new Response(
        JSON.stringify(
          new ApiSuccess(200, "Related Blog fetched!", getRelated)
        ),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //create comment for a blog
  static async createBlogComment(request: Request, { params }: Params) {
    const validate = commentValidation.parse(await request.json());
    const { userId, comment }: commentType = validate;
    try {
      connectDB();
      const blogId = params.id;
      const newBlogComment = new BlogComment({
        author: userId,
        blog: blogId,
        comment,
      });

      await newBlogComment.save();
      return new Response(
        JSON.stringify(new ApiSuccess(201, "comment created!", newBlogComment)),
        { status: 201 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //get all comments for a blog
  static async getBlogComments(request: Request, { params }: Params) {
    try {
      connectDB();
      const getComments = await BlogComment.find({ blog: params.id })
        .populate("author")
        .populate("blog");
      return new Response(
        JSON.stringify(
          new ApiSuccess(200, "Blog comments fetched!", getComments)
        ),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //get a specific blog comment
  static async getBlogComment(request: Request, { params }: Params) {
    try {
      connectDB();
      const getComment = await BlogComment.findById(params.id).populate(
        "author"
      );
      return new Response(
        JSON.stringify(
          new ApiSuccess(200, "Blog comment fetched!", getComment)
        ),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //delete a specific blog comment
  static async deleteBlogComment(request: Request, { params }: Params) {
    try {
      connectDB();
      const deleteComment = await BlogComment.findByIdAndDelete(params.id);
      return new Response(
        JSON.stringify(
          new ApiSuccess(200, "Blog Comment deleted!", deleteComment)
        ),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //edit a specific blog comment
  static async editBlogComment(request: Request, { params }: Params) {
    const validate = editCommentValidation.parse(await request.json());
    const { comment }: editCommentType = validate;
    try {
      connectDB();
      const blogComment = await BlogComment.findById(params.id);
      blogComment.comment = comment;
      await blogComment.save();
      return new Response(
        JSON.stringify(
          new ApiSuccess(200, "Blog Comment edited!", blogComment)
        ),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //reply to a comment made in the blog
  static async ReplyBlogComment(request: Request, { params }: Params) {
    const validate = replyValidation.parse(await request.json());
    const { userId, reply }: replyType = validate;
    try {
      connectDB();
      const blogcommentId = params.id;
      const newBlogReply = new BlogReply({
        author: userId,
        blogcomment: blogcommentId,
        reply,
      });

      await newBlogReply.save();
      return new Response(
        JSON.stringify(new ApiSuccess(201, "comment created!", newBlogReply)),
        { status: 201 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //get all blog comment replies
  static async getBlogCommentsReply(request: Request, { params }: Params) {
    try {
      connectDB();
      const getReplys = await BlogReply.find({
        blogcomment: params.id,
      }).populate("author");
      return new Response(
        JSON.stringify(
          new ApiSuccess(200, "Blog comments reply fetched!", getReplys)
        ),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //get reply
  static async getBlogReply(request: Request, { params }: Params) {
    try {
      connectDB();
      const getReply = await BlogReply.findById(params.id).populate("author");
      return new Response(
        JSON.stringify(
          new ApiSuccess(200, "Blog comment reply fetched!", getReply)
        ),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //delete a specific blog comment reply
  static async deleteBlogCommentReply(request: Request, { params }: Params) {
    try {
      connectDB();
      const deleteReply = await BlogReply.findByIdAndDelete(params.id);
      return new Response(
        JSON.stringify(
          new ApiSuccess(200, "Blog Comment deleted!", deleteReply)
        ),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //edit a specific blog comment reply
  static async editBlogCommentReply(request: Request, { params }: Params) {
    const validate = editReplyValidation.parse(await request.json());
    const { reply }: editReplyType = validate;
    try {
      connectDB();
      const blogreply = await BlogReply.findById(params.id);
      blogreply.reply = reply;
      await blogreply.save();
      return new Response(
        JSON.stringify(new ApiSuccess(200, "Blog Comment edited!", blogreply)),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //save a blog
  static async saveBlog(request: Request, { params }: Params) {
    const validate = saveValidation.parse(await request.json());
    const { userId, ownerId }: saveType = validate;
    try {
      connectDB();
      const blogId = params.id;
      const saveblog = new Save({
        author: userId,
        blog: blogId,
        owner: ownerId,
      });
      await saveblog.save();
      return new Response(
        JSON.stringify(new ApiSuccess(201, "Blog saved!", saveblog)),
        { status: 201 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //get all blog saved by user
  static async getSavedBlogs(request: Request, { params }: Params) {
    try {
      connectDB();
      const getsavedblogs = await Save.find({ author: params.id })
        .populate("author")
        .populate("blog")
        .populate("owner");
      return new Response(
        JSON.stringify(
          new ApiSuccess(200, "Save blogs gotten!", getsavedblogs)
        ),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //get save blog by id
  static async getOneSavedBlog(request: Request, { params }: Params) {
    try {
      connectDB();
      const getsavedblog = await Save.findById(params.id);
      return new Response(
        JSON.stringify(new ApiSuccess(200, "Save blog gotten!", getsavedblog)),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //unsave saved blog
  static async unSaveBlog(request: Request, { params }: Params) {
    try {
      connectDB();
      const deleteSave = await Save.findByIdAndDelete(params.id);
      return new Response(
        JSON.stringify(new ApiSuccess(200, "Save blog removed!", deleteSave)),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //like a blog
  static async likeBlog(request: Request, { params }: Params) {
    const { userId } = await request.json();
    try {
      connectDB();
      const blogId = params.id;
      const existingLike = await Like.findOne({ author: userId, blog: blogId });

      if (existingLike) {
        return new Response(
          JSON.stringify(new ApiError(500, "You've already liked!", [""])),
          { status: 500 }
        );
      } else {
        const likeblog = await Like.create({
          author: userId,
          blog: blogId,
        });

        updateLikeCount(blogId);
        return new Response(
          JSON.stringify(new ApiSuccess(201, "Blog liked!", likeblog)),
          { status: 200 }
        );
      }
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }

  //get users that liked a blog
  static async getLikes(request: Request, { params }: Params) {
    try {
      connectDB();
      const getlikes = await Like.find({ blog: params.id }).populate("author");
      return new Response(
        JSON.stringify(new ApiSuccess(20, "Gotten user who liked!", getlikes)),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong!", [error])),
        { status: 500 }
      );
    }
  }
}

export default BlogController;

const updateLikeCount = async (blogId: string) => {
  const blog = await Blog.findById(blogId);
  blog.likes = await Like.countDocuments({ blog: blogId });
  await blog.save();

  return new Response(
    JSON.stringify(new ApiSuccess(200, "Liked added to blog!", blog)),
    { status: 200 }
  );
};

/*coded by Esan Samuel
  designed by Esan Samuel*/
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<(Esan Samuel:-D)>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
