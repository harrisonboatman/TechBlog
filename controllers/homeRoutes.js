const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
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

router.get('/blog/:id', withAuth, (req, res) => {
  Blog.findByPk( req.params.id,{
    include: [
      User,
      {
        model: Comment,
        // attributes: ['id', 'body', 'blog_id', 'user_id' ],
        include: [User]
      }

    ]
})
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const blogs = dbPostData.get({ plain: true });
      console.log(blogs);
    
      // pass data to template
      res.render('viewPost', {
        blogs, logged_in: req.session.logged_in
      }

      );
      // res.json(blog)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});
module.exports = router