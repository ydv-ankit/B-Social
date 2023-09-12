const mongoose = require("mongoose");
import { genUsername } from "../utils/genUsername";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
    likes: {
      type: Array,
    },
    comments: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema = new mongoose.Schema(
  {
    profilePicture: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      default: () => {
        genUsername();
      },
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    followings: {
      type: Array,
    },
    followers: {
      type: Array,
    },
    createdAt:{
      type: Date
    },
    lastSignInTime:{
      type: Date
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model("users", UserSchema);
const PostModel = new mongoose.model("posts", PostSchema);

module.exports = { UserModel, PostModel };
