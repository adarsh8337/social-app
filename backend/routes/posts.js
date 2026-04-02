const router = require("express").Router();
const Post = require("../models/Post");

router.post("/create", async (req,res)=>{
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

router.get("/feed", async (req,res)=>{
  const posts = await Post.find().sort({createdAt:-1});
  res.json(posts);
});

router.put("/like/:id", async (req,res)=>{
  const post = await Post.findById(req.params.id);

  if(!post.likes.includes(req.body.username)){
    post.likes.push(req.body.username);
  }

  await post.save();
  res.json(post);
});

router.put("/comment/:id", async (req,res)=>{
  const post = await Post.findById(req.params.id);

  post.comments.push(req.body);

  await post.save();
  res.json(post);
});

module.exports = router;