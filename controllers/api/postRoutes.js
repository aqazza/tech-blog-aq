const router = require("express").Router();
const { Post } = require("../../models/");
const withAuth = require("../../utils/auth");

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware
router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
      userId: req.session.userId,
    });
    await newPost.save();
    res.json({ message: "Post created successfully" });
    console.log(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TODO - create a PUT route for updating a post's title or body
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// This should be a protected route, so you'll need to use the withAuth middleware

// TODO - create a DELETE route for deleting a post with a specific id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });
    await post.remove();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// This should be a protected route, so you'll need to use the withAuth middleware

module.exports = router;
