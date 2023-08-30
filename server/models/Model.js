const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    images: {
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
      unique:true
    },
    fullname:{
      type:String
    },
    email:{
      type:String,
      required: true
    },
    followings: {
      type: Array,
    },
    followers: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model("Users", UserSchema);
const PostModel = new mongoose.model("Posts", PostSchema);

module.exports = { UserModel, PostModel };
