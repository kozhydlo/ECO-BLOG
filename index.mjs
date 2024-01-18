import express from "express";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import CommentModel from "./models/Comment.js";
import UserModel from "./models/user.js";
import PostModel from "./models/Post.js";

// import commentRoutes from './commentRoutes.js';
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import { checkAuth } from "./utils/checkAuth.js";
import { handleValidationErrors } from "./utils/handleValidationErrors.js";
import { UserController, PostController } from "./controllers/index.js";

// const MONGODB_URI = "mongodb://127.0.0.1:27017/book";

const MONGODB_URL =
  "mongodb+srv://markkozhydlo:mark2010@eko-blog.nlbzo5x.mongodb.net/blog?retryWrites=true&w=majority";

// const MONGODB_URI =
//   "mongodb+srv://markkozhydlo:mark2010@eko-blog.nlbzo5x.mongodb.net/blog?retryWrites=true&w=majority";
// >>>>>>> 06d96b57c9fce621633ed6f2b0224f0578f03860

// mongoose
//   .connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("База даних підключена"))
//   .catch((err) => console.error("Помилка з'єднання з базою даних", err));
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("База даних підключена"))
  .catch((err) => console.error("Помилка з'єднання з базою даних", err));

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
// app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.get("/auth/me", checkAuth, UserController.getMe);

// app.get("/test", function (req, res) {
//   res.send("hello world");
// });

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// app.use(commentRoutes);

app.get("/tags", PostController.getLastTags);
app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);

app.get("/postByTeg", async (req, res) => {
  try {
    const { tags } = req.query;
    console.log("tags: ", tags);

    const posts = await PostModel.find({
      tags: { $in: Array.isArray(tags) ? tags : [tags] },
    });

    console.log("posts: ", posts);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts by tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);

app.get("/comment", async (req, res) => {
  const { postId } = req.query;

  const comments = await CommentModel.find({ postId }).populate(
    "userId",
    "fullname avatarUrl -_id"
  );
  res.send(comments);
});

app.post("/comment", async (req, res) => {
  const { postId, text, userId } = req.body;

  const comment = await CommentModel.create({ postId, text, userId });
  res.status(201).send(comment);
});

app.get("/user", async (req, res) => {
  const { postId } = req.query;

  const comments = await CommentModel.findById(postId).populate(
    "userId",
    "fullname avatarUrl -_id"
  );
  res.send(comments);
});

app.delete("/posts/:id", checkAuth, PostController.remove);

app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Сервер працює");
});
