const { PostModel, UserModel } = require("../models/Model");

const router = require("express").Router();

// User routes
router.post("/users/new", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ error: "error occured" });
  }
});

router.get("/users/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await UserModel.findOne({ email: email });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ error: "not found" });
  }
});

router.get("/users/:firebaseUserId", async (req, res) => {
  const firebaseUserId = req.params.firebaseUserId;
  try {
    const user = await UserModel.findOne({ firebaseUserId: firebaseUserId });
    res.status(200).send({ status: true });
  } catch (err) {
    res.status(400).send({ status: false });
  }
});

// followings add/minus
router.put("/users/followings", async (req, res) => {
  const followId = req.body.followId;
  try {
    const userDesc = await UserModel.findOne({
      firebaseUserId: req.body.userId,
    });
    if (userDesc.followings.includes(followId)) {
      const userUnfollow = await UserModel.updateOne(
        { firebaseUserId: req.body.userId },
        {
          $pull: { followings: followId },
        }
      );
      const userUnFollowSelf = await UserModel.updateOne(
        { firebaseUserId: followId },
        {
          $pull: { followers: req.body.userId },
        }
      );
      res.send("unfollowed");
    } else {
      const userFollow = await UserModel.updateOne(
        { firebaseUserId: req.body.userId },
        {
          $push: { followings: followId },
        }
      );
      const userFollowSelf = await UserModel.updateOne(
        { firebaseUserId: followId },
        {
          $push: { followers: req.body.userId },
        }
      );
      res.send("following");
    }
  } catch (error) {
    console.log(error);
  }
});

// --------------------------------------------------------------
// Posts API

router.get("/posts/profileposts/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const posts = await PostModel.find({ userId: userId });
    res.status(200).send({ "posts": posts });
  } catch (err) {
    res.status.apply(404).send({ error: "cannot get posts" });
  }
});

router.get("/posts/all/:id", async (req, res) => {
  const firebaseUserId = req.params.id;
  let posts = [];
  try {
    // get user followings
    const resp = await UserModel.findOne({ firebaseUserId: firebaseUserId });
    if (resp) {
      // Create an array of promises for fetching posts
      const postPromises = resp.followings.map(async (id) => {
        const post = await PostModel.find({ userId: id });
        return post;
      });

      // Wait for all the promises to resolve
      const allPosts = await Promise.all(postPromises);

      // Flatten the array of arrays into a single posts array
      posts = allPosts.flat();
    }
    res.status(200).send({ posts: posts });
  } catch (err) {
    res.status.apply(400).send({ error: "cannot get posts" });
  }
});

router.post("/posts/new", async (req, res) => {
  console.log(req.body);
  const post = await PostModel.create(req.body);
  console.log(post);
  res.send(post);
});

module.exports = router;
