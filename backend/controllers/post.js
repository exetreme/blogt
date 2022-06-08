const Post = require("../models/post");
const FeaturedPost = require("../models/featuredPost");

const FEATURED_POST_COUNT = 4;

const addFeaturedPost = async (postID) => {
  const featuredPost = new FeaturedPost({ post: postID });
  await featuredPost.save();

  const featuredPosts = await FeaturedPost.find({}).sort({ createdAt: -1 });

  featuredPosts.forEach(async (post, index) => {
    if (index >= FEATURED_POST_COUNT)
      await FeaturedPost.findByIdAndDelete(post._id);
  });
};

exports.createPost = async (req, res) => {
  const { title, meta, content, slug, author, tags, featured } = req.body;
  const newPost = new Post({
    title,
    meta,
    content,
    slug,
    author,
    tags,
  });

  await newPost.save();

  if (featured) await addFeaturedPost(newPost._id);

  res.json(newPost);
};
