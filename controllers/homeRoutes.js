const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],

        }
      ]
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    // finds a post by primary key(id) with the 'username' of the associated User
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {model: User},
      ],
    });

    // finds all comments related to the post's 'id', along with the 'username' of each comment's associated User
    const commentData = await Comment.findAll({
      where: {
        blog_id: req.params.id,
      },
      include: [
        {model: User},
      ],
    });

    const blog = blogData.get({ plain: true });

    const comments = commentData.map((comment) =>
    comment.get({ plain: true })
    );
console.log(blog)
    res.render('viewPost', {
      ...blog,
      comments,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});
module.exports = router