const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req,res) => {
    try{
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req,res) => {
    try {
        const commentData = await Comment.udpate(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }

        });

        if(!commentData) {
            req.status(500).json({message: "There are no comments with the corresponding ID"})
        return;
        }

        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req,res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        req.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router