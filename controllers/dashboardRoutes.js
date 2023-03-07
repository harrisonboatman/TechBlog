const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req,res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        const blogs = blogData.map((blog)=> blog.get({ plain: true }));
console.log(blogs)
        res.render('dashboard', {
            blogs,
            username: req.session.username,
            user_id: req.session.user_id,

            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/newPost', withAuth, async (req, res) => {
    try {
      res.render('newPost', {
        username: req.session.username,
        user_id: req.session.user_id,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/update/:id', withAuth, async(req,res) => {
    try{
        const blogData = await Blog.findByPk({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })
        const blog = blogData.get({ plain: true });

        res.render('editPost', {
            blog, 
            // username: req.session.username,
            // user_id:req.session.user_id,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).redirect('/dashboard')
    }
});

module.exports = router