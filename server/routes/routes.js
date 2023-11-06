const { PostModel, UserModel } = require("../models/Model");

const router = require("express").Router();

// User routes
router.post("/users/new", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    res.status(203).send({ "status": false });
  }
});

router.get("/users/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.status(200).send({ status: user });
    } else {
      res.status(200).send({ status: "not found" });
    }
  } catch (err) {
    res.status(400).send({ error: "cannot get userdata" });
  }
});

router.get("/users/id/:firebaseUserId", async (req, res) => {
  const firebaseUserId = req.params.firebaseUserId;
  try {
    const user = await UserModel.findOne({ firebaseUserId: firebaseUserId });
    res.status(200).send({ data: user });
  } catch (err) {
    res.status(400).send({ error: "not found" });
  }
});

router.get("/users/explore/:text", async (req, res) => {
  const searchText = req.params.text.toLowerCase();
  let data = [];
  await UserModel.find().then((resp) => {
    resp.map(e => {
      if (e.fullname.toLowerCase().includes(searchText) || e.username.toLowerCase().includes(searchText)) {
        data.push(e);
      }
    })
    res.status(200).send({ "users": data });
  }).catch((err) => {
    res.status(202).send({ "status": "try again later !" })
  })
})

// followings add/minus
router.put("/users/followings", async (req, res) => {
  const followId = req.body.followId;
  if (req.body.userId === req.body.followId) {
    res.status(400).send({ "status": "cannot follow self" });
  }
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
      res.send({ status: "unfollowed" });
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
      res.send({ status: "followed" });
    }
  } catch (error) {
    console.log(error);
  }
});

// --------------------------------------------------------------
// Posts API

// get user profile posts
router.get("/posts/profileposts/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const posts = await PostModel.find({ userId: userId });
    res.status(200).send({ posts: posts });
  } catch (err) {
    res.status.apply(404).send({ error: "cannot get posts" });
  }
});

// get all posts of followings
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
    res.status(400).send({ error: "cannot get posts" });
  }
});

router.post("/posts/new", async (req, res) => {
  console.log(req.body);
  const post = await PostModel.create(req.body);
  console.log(post);
  res.send({ post: post });
});

// like dislike
router.get("/post/like/:userId/:postId", async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;

  async function updateLike(userId, postId) {
    await PostModel.updateOne({ _id: postId }, { $push: { likes: userId } })
      .then((resp) => {
        return true;
      }).catch((err) => {
        console.log("error: cannot like/dislike" + err);
        return false;
      })
  }


  async function updateDislike(userId, postId) {
    await PostModel.updateOne({ _id: postId }, { $pull: { likes: userId } })
      .then((resp) => {
        return true;
      }).catch((err) => {
        console.log("error: cannot like/dislike" + err);
        return false;
      })
  }

  await PostModel.findOne({ _id: postId })
    .then((resp) => {
      if (resp.likes.includes(userId)) {
        updateDislike(userId, postId);
        res.send({ "status": "disliked" })
      }
      else {
        updateLike(userId, postId);
        res.send({ "status": "liked" })
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ "status": "cannot set like/dislike" });
    })

})

// delete a post
router.get("/post/delete/:postId", async (req, res) => {
  await PostModel.deleteOne({_id: req.params.postId})
    .then((resp)=>{
      if(resp.deletedCount === 1){
        res.status(200).send({"deletion":"done"})
      }else{
        res.status(200).send({"deletion":"no post found"})
      }
    }).catch((err)=>{
      res.status(500).send({"deletion":"error"})
    })
})

// retweet a post
router.get("/post/retweet/:userId/:postId", async (req, res) => {
  async function createRetweetPost(data) {
    await PostModel.create(data)
      .then(async (resp) => {
        await PostModel.findByIdAndUpdate(req.params.postId, { $push: { retweets: req.params.userId } })
          .then((a) => {
            return true
          }).catch((error) => {
            return false;
          })
      })
      .catch((err) => { return false })
  }

  await PostModel.findOne({ _id: req.params.postId })
    .then((resp) => {
      resp.userId = req.params.userId;
      const { userId, content, images } = resp;
      createRetweetPost({ userId, content, images, isRetweeted: true });
      res.status(200).send({ "status": "retweeted" })
    }).catch((err) => {
      res.status(401).send({ "status": "error occured" })
    })
})

// get followings
router.get("/users/get/followings/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.findOne({ firebaseUserId: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const followings = user.followings || [];

    const followingsData = await Promise.all(
      followings.map(async (element) => {
        try {
          const userResp = await UserModel.findOne({ firebaseUserId: element });
          return userResp;
        } catch (err) {
          console.log(err);
          return null;
        }
      })
    );

    res.status(201).json({ followingsData: followingsData.filter(Boolean) });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get followers
router.get("/users/get/followers/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.findOne({ firebaseUserId: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const followers = user.followers || [];

    const followersData = await Promise.all(
      followers.map(async (element) => {
        try {
          const userResp = await UserModel.findOne({ firebaseUserId: element });
          return userResp;
        } catch (err) {
          console.log(err);
          return null;
        }
      })
    );

    res.status(201).json({ followersData: followersData.filter(Boolean) });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;