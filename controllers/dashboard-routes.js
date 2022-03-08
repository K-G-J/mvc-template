const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for the dashboard
router.get('/', withAuth, (req, res) => {
  Post.findAll({ 
    where: { 
      // use the id from the session 
      user_id: req.session.user_id
    },
    attributes: [
      'id', 'post_url', 'title', 'created_at', 'post_image', 
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  }).then(dbPostData => {
    // serialize the data
    const posts = dbPostData.map(post => post.get({ plain: true }))
    res.render('dashboard', { posts, loggedIn: true })
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});
// get post for edit-post page 
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'post_image',
      'text',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
        ),
        'vote_count'
      ]
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('edit-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
})
module.exports = router;
