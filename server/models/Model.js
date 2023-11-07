const mongoose = require("mongoose");

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
    retweets: {
      type: Array
    },
    isRetweeted: {
      type: Boolean,
      default: false
    },
    bookmarks:{
      type: Array
    }
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
    firebaseUserId: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    followings: {
      type: Array,
    },
    followers: {
      type: Array,
    },
    createdAt: {
      type: Date,
    },
    lastSignInTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model("users", UserSchema);
const PostModel = new mongoose.model("posts", PostSchema);

module.exports = { UserModel, PostModel };
