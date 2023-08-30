const { PostModel, UserModel } = require("../models/Model");

const router = require("express").Router();

// User routes
router.post("/users/new", async (req, res) => {
  const user = await UserModel.create(req.body);
  res.status(200).send(user);
});

router.get("/users/:email", async (req, res) => {
  const email = req.params.email;
  const user = await UserModel.findOne({ email: email });
  res.status(200).send(user);
});

// followings add/minus
router.put("/users/followings", async (req, res) => {
  const followId = req.body.followId;
  const userDesc = await UserModel.findOne({ _id: req.body.userId });
  console.log(userDesc);
  if (userDesc.followings.includes(followId)) {
    const userUnfollow = await UserModel.updateOne(
      { _id: req.body.userId },
      {
        $pull: { followings: followId },
      }
    );
    const userUnFollowSelf = await UserModel.updateOne(
      { _id: followId },
      {
        $pull: { followers: req.body.userId},
      }
    );
    res.send("unfollowed");
  } else {
    const userFollow = await UserModel.updateOne(
      { _id: req.body.userId },
      {
        $push: { followings: followId},
      }
    );
    const userFollowSelf = await UserModel.updateOne(
      { _id: followId },
      {
        $push: { followers: req.body.userId},
      }
    );
    res.send("following");
  }
});

router.get("/posts/:id", async (req, res) => {
  console.log(req.body);
  const user = await PostModel.find({ userId: req.body.userId });
  console.log(user);
  res.send(user);
});

router.post("/posts/new", async (req, res) => {
  console.log(req.body);
  const post = await PostModel.create(req.body);
  console.log(post);
  res.send(post);
});

module.exports = router;
