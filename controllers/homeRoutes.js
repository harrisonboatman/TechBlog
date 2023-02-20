const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require ('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll( {
            include: [
                {model: User
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
                    model: User
                }
            ]
        })
        const blog = blogData.get({ plain: true});

        res.render('viewPost', {
            ...blog,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router