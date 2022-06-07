const Post = require("../models/post");

exports.createPost = async (req, res) => {
  try {
    const { title, meta, content, slug, author, tags } = req.body;
    const newPost = new Post({
      title,
      meta,
      content,
      slug,
      author,
      tags,
    });

    await newPost.save();

    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
