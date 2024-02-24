import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  image: string;
  email: string;
  createdAt: any;
  nickname?: string;
  jobtype?:
    | "Frontend developer"
    | "UI/UX designer"
    | "Backend developer"
    | "Software engineer"
    | "Cyber Security expert";
  bio?: string;
}

export interface IComment extends Document {
  author: mongoose.Types.ObjectId;
  blog: mongoose.Types.ObjectId;
  comment: string;
  createdAt: any;
}

export interface IReply extends Document {
  author: mongoose.Types.ObjectId;
  blogcomment: mongoose.Types.ObjectId;
  reply: string;
  createdAt: any;
}

export interface IBlog extends Document {
  author: mongoose.Types.ObjectId;
  title: string;
  image: string;
  firstParagraph: string;
  firstContent: string;
  secondParagraph: string;
  secondContent: string;
  thirdParagraph: string;
  thirdContent: string;
  createdAt: any;
  category:
    | "Web development"
    | "Mobile development"
    | "AI & ML"
    | "Data science"
    | "Blockchain";
  likes: number;
  dislikes: number;
  theme: string;
}

export interface ISave extends Document {
  author: mongoose.Types.ObjectId;
  blog: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
  createdAt: any;
}

export interface usersType {
  _id: string;
  username: string;
  image: string;
  email: string;
  createdAt: any;
  nickname?: string;
  jobtype?:
    | "Frontend developer"
    | "UI/UX designer"
    | "Backend developer"
    | "Software engineer"
    | "Cyber Security expert";
}
[];

export interface userType {
  _id: string;
  username: string;
  image: string;
  email: string;
  createdAt: any;
  nickname?: string;
  jobtype?:
    | "Frontend developer"
    | "UI/UX designer"
    | "Backend developer"
    | "Software engineer"
    | "Cyber Security expert";
  bio?: string;
}

export interface blogType {
  author: {
    _id: string;
    username: string;
    image: string;
    email: string;
    createdAt: any;
    nickname?: string;
    jobtype?:
      | "Frontend developer"
      | "UI/UX designer"
      | "Backend developer"
      | "Software engineer"
      | "Cyber Security expert";
  };
  _id: string;
  title: string;
  image: string;
  firstParagraph: string;
  firstContent: string;
  secondParagraph: string;
  secondContent: string;
  thirdParagraph: string;
  thirdContent: string;
  createdAt: any;
  category:
    | "Web development"
    | "Mobile development"
    | "AI & ML"
    | "Data science"
    | "Blockchain";
  theme: "Light" | "Dark";
}
[];

export interface singleblogType {
  author: {
    _id: string;
    username: string;
    image: string;
    email: string;
    createdAt: any;
    nickname?: string;
    jobtype?:
      | "Frontend developer"
      | "UI/UX designer"
      | "Backend developer"
      | "Software engineer"
      | "Cyber Security expert";
  };
  _id: string;
  title: string;
  image: string;
  firstParagraph: string;
  firstContent: string;
  secondParagraph: string;
  secondContent: string;
  thirdParagraph: string;
  thirdContent: string;
  createdAt: any;
  category:
    | "Web development"
    | "Mobile development"
    | "AI & ML"
    | "Data science"
    | "Blockchain";
  theme: "Light" | "Dark";
}

export interface allCommentsProps {
  author: {
    _id: string;
    username: string;
    image: string;
    email: string;
    createdAt: any;
    nickname?: string;
    jobtype?:
      | "Frontend developer"
      | "UI/UX designer"
      | "Backend developer"
      | "Software engineer"
      | "Cyber Security expert";
  };
  blog: {
    author: {
      _id: string;
      username: string;
      image: string;
      email: string;
      createdAt: any;
      nickname?: string;
      jobtype?:
        | "Frontend developer"
        | "UI/UX designer"
        | "Backend developer"
        | "Software engineer"
        | "Cyber Security expert";
    };
    _id: string;
    title: string;
    image: string;
    firstParagraph: string;
    firstContent: string;
    secondParagraph: string;
    secondContent: string;
    thirdParagraph: string;
    thirdContent: string;
    createdAt: any;
    category:
      | "Web development"
      | "Mobile development"
      | "AI & ML"
      | "Data science"
      | "Blockchain";
  };
  _id: string;
  comment: string;
  createdAt: any;
}
[];

export interface commentProps {
  author: {
    _id: string;
    username: string;
    image: string;
    email: string;
    createdAt: any;
    nickname?: string;
    jobtype?:
      | "Frontend developer"
      | "UI/UX designer"
      | "Backend developer"
      | "Software engineer"
      | "Cyber Security expert";
  };
  blog: {
    author: {
      _id: string;
      username: string;
      image: string;
      email: string;
      createdAt: any;
      nickname?: string;
      jobtype?:
        | "Frontend developer"
        | "UI/UX designer"
        | "Backend developer"
        | "Software engineer"
        | "Cyber Security expert";
    };
    _id: string;
    title: string;
    image: string;
    firstParagraph: string;
    firstContent: string;
    secondParagraph: string;
    secondContent: string;
    thirdParagraph: string;
    thirdContent: string;
    createdAt: any;
    category:
      | "Web development"
      | "Mobile development"
      | "AI & ML"
      | "Data science"
      | "Blockchain";
  };
  _id: string;
  comment: string;
  createdAt: any;
}

export interface replyProps {
  _id: string;
  reply: string;
  createdAt: any;
  author: {
    _id: string;
    username: string;
    image: string;
    email: string;
    createdAt: any;
    nickname?: string;
    jobtype?:
      | "Frontend developer"
      | "UI/UX designer"
      | "Backend developer"
      | "Software engineer"
      | "Cyber Security expert";
  };
  blogcomment: {
    author: {
      _id: string;
      username: string;
      image: string;
      email: string;
      createdAt: any;
      nickname?: string;
      jobtype?:
        | "Frontend developer"
        | "UI/UX designer"
        | "Backend developer"
        | "Software engineer"
        | "Cyber Security expert";
    };
    blog: {
      author: {
        _id: string;
        username: string;
        image: string;
        email: string;
        createdAt: any;
        nickname?: string;
        jobtype?:
          | "Frontend developer"
          | "UI/UX designer"
          | "Backend developer"
          | "Software engineer"
          | "Cyber Security expert";
      };
      _id: string;
      title: string;
      image: string;
      firstParagraph: string;
      firstContent: string;
      secondParagraph: string;
      secondContent: string;
      thirdParagraph: string;
      thirdContent: string;
      createdAt: any;
      category:
        | "Web development"
        | "Mobile development"
        | "AI & ML"
        | "Data science"
        | "Blockchain";
    };
    _id: string;
    comment: string;
    createdAt: any;
  };
}
[];

export interface singleReplyProps {
  _id: string;
  reply: string;
  createdAt: any;
  author: {
    _id: string;
    username: string;
    image: string;
    email: string;
    createdAt: any;
    nickname?: string;
    jobtype?:
      | "Frontend developer"
      | "UI/UX designer"
      | "Backend developer"
      | "Software engineer"
      | "Cyber Security expert";
  };
  blogcomment: {
    author: {
      _id: string;
      username: string;
      image: string;
      email: string;
      createdAt: any;
      nickname?: string;
      jobtype?:
        | "Frontend developer"
        | "UI/UX designer"
        | "Backend developer"
        | "Software engineer"
        | "Cyber Security expert";
    };
    blog: {
      author: {
        _id: string;
        username: string;
        image: string;
        email: string;
        createdAt: any;
        nickname?: string;
        jobtype?:
          | "Frontend developer"
          | "UI/UX designer"
          | "Backend developer"
          | "Software engineer"
          | "Cyber Security expert";
      };
      _id: string;
      title: string;
      image: string;
      firstParagraph: string;
      firstContent: string;
      secondParagraph: string;
      secondContent: string;
      thirdParagraph: string;
      thirdContent: string;
      createdAt: any;
      category:
        | "Web development"
        | "Mobile development"
        | "AI & ML"
        | "Data science"
        | "Blockchain";
    };
    _id: string;
    comment: string;
    createdAt: any;
  };
}
