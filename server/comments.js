const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

const posts = require("./posts.js");
const Post = posts.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post'
  },
  body: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema);

//post a comment
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  // check parameters
  console.log("post comment");
  const comment = new Comment({
    user: req.user._id,
    post: req.body.post,
    body: req.body.body,
  });
  try {
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//get all comments for a photo
router.get("/:id", async (req, res) => {
  try {
    let comments = await Comment.find({
      post: mongoose.Types.ObjectId(req.params.id)
    }).populate('user');
    //console.log("returning " + comments.length + " comments");
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//delete comments for specific post
//called when a post is deleted
router.delete("/:id", async (req, res) => {
  try {
    await Comment.deleteMany({
      post: mongoose.Types.ObjectId(req.params.id)
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//delete a single comment
router.delete("/one/:id", async (req, res) => {
  try {
    await Comment.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


module.exports = {
  model: Comment,
  routes: router,
}
