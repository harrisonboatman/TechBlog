const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require ('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll( {
            include: [
                {model: User,
                    attributes: ['username'],

                }
            ]
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true}));

        res.render('homepage', {
            blogs, 
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/blog/:id', withAuth, async (req, res)=> {
    try {
        const blogData = await Blog.findByPK(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],

                }
            ]
        });
const commentData = await Comment.findAll({
    where: {
        blog_id: req.params.id
    },
    include: [
        {
            model: User,
            attributes: ['username']
        }
    ]
});


        const blog = blogData.get({ plain: true});
        const comment = commentData.map((comment) => {
            comment.get({ plain: true })
        });


        res.render('viewPost', {
            ...blog,
            comment,
            logged_in: req.session.logged_in,
            username:req.session.username
        })
    } catch (err) {
        res.status(500).json(err)
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