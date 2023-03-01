// Dashboard Routes
// This is a set of routes that will be used to render the dashboard pages.
// All of these routes will be protected by the withAuth middleware function.

const router = require("express").Router();
const { Post } = require("../models/");
const withAuth = require("../utils/auth");

// TODO - create logic for the GET route for / that renders the dashboard homepage
// It should display all of the posts created by the logged in user
router.get("/", withAuth, async (req, res) => {
  const postsData = await Post.findAll({
    where: { userId: req.session.userId },
  });
  const posts = postsData.map((post) => post.get({ plain: true }));
  console.log(posts);
  res.render("admin-all-posts", { layout: "dashboard", posts });
});
// TODO - retrieve all posts from the database for the logged in user
// render the dashboard template with the posts retrieved from the database
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", { layout: "dashboard" });
});
//default layout is set to main.handlebars, layout need to be changed to dashboard to use dashboard.handlebars

// refer to admin-all-posts.handlebars write the code to display the posts

// TODO - create logic for the GET route for /new that renders the new post page
// It should display a form for creating a new post
// router.get("/edit/:id", withAuth, async (req, res) => {
//   const post = await Post.findOne({
//     id: req.params.id,
//     author: req.session.userId,
//   });
//   if (!post) return res.status(404).json({ message: "Post not found" });
//   res.render("admin-edit-post", { layout: "dashboard", post });
// });

router.get("/delete/:id", withAuth, async (req, res) => {
  const post = await Post.destroy({
    where: {
      id: req.params.id,
      userId: req.session.userId,
    },
  });
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.status(200).redirect("/dashboard");
});
// It should display a form for editing an existing post

module.exports = router;
