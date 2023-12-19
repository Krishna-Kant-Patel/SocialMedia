const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  image: String,
  title:String,
  caption:String,
  comments: [{ text: String, user:String }],
  likes: { type: Number, default: 0 }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;