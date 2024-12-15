const express = require('express');
const { Post } = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all posts
router.get('/', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [['createTime', 'DESC']] });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single post
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.user.userId,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a post
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.update(req.body);
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like a post
router.put('/:id/like', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.increment('likes');
    res.json({ message: 'Post liked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a post
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.destroy();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete all posts
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await Post.destroy({ where: {} });
    res.json({ message: 'All posts deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;