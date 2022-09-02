// SERVER SETUP //////////////////////////
const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./src/db");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

dotenv.config();

const app = express();

connectDB();

app.use("/images", express.static(path.join(__dirname, "public/images")));

// MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// FILE UPLOADING WITH MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

// LINK TO USERS ROUTER //////////////////////////
const userRouter = require("./routes/users");
app.use("/api/users", userRouter);
/////////////////////////////////////////////////

// LINK TO AUTH ROUTER //////////////////////////
const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);
/////////////////////////////////////////////////

// LINK TO POSTS ROUTER //////////////////////////
const postRouter = require("./routes/posts");
app.use("/api/posts", postRouter);
/////////////////////////////////////////////////

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
