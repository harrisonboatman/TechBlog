const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req,res) => {
    try {
        console.log('eweew')
        const blogData = await Blog.create({
            ...req.body,
            user_id: req.session.user_id
        });
        console.log(blogData)

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/:id', withAuth, async (req,res)=> {
    try {
        const blogData = await Blog.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err)
    }
});


router.delete('/:id', withAuth, async (req,res) => {
    try{
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        res.status(200).json(blogData)
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;