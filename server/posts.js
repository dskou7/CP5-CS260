const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;


const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  title: String,
  game: String,
  desctiption: String,
  needed: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Post = mongoose.model('Post', postSchema);

//create an LFG post
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  // check parameters
  console.log("creating post");
  const post = new Post({
    user: req.user,
    title: req.body.title,
    game: req.body.game,
    description : req.body.description,
    needed: req.body.needed,
  });
  try {
    await post.save();
    //console.log("comment saved");
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//get a user's posts
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  // return comments
  console.log("user posts get firing");
  try {
    let posts = await Post.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//get all posts
router.get("/all", async (req, res) =>{
  console.log("get all posts called")
  try {
    let posts = await Post.find().sort({
      created: -1
    }).populate('user');
    return res.send(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//get a certain post
router.get("/:id", async (req, res) => {
  // return comments
  console.log("post get firing");
  try {
    let posts = await Post.find({
      _id: req.params.id
    }).populate('user');
    return res.send(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/:id", auth.verifyToken, User.verify, async (req, res) =>{
  try {
    await Post.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/:id", auth.verifyToken, User.verify, async (req, res) =>{
  //might get implemented later
});

module.exports = {
  model: Post,
  routes: router,
}
