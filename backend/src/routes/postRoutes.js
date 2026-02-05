import express from 'express';
import Post from '../models/Post.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// GET ALL POSTS (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'name handle');

    const formattedPosts = posts.map((post) => ({
      _id: post._id,
      username: post.userId?.name || 'Unknown',
      handle: post.userId?.handle || '@unknown',
      text: post.text,
      image: post.image,
      likes: post.likes?.length || 0,
      likedBy: post.likes || [],
      comments: post.comments || [],
      createdAt: post.createdAt,
    }));
    
    res.json(formattedPosts);
  } catch (err) {
    console.error('FETCH POSTS ERROR:', err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// CREATE POST (PROTECTED)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { text, image } = req.body;

    if (!text && !image) {
      return res.status(400).json({ message: 'Post cannot be empty' });
    }

    const post = await Post.create({
      userId: req.user.userId, 
      text,
      image,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post', error: err.message });
  }
});

// LIKE POST
router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.user.userId)) {
      post.likes.push(req.user.userId);
    } else {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user.userId
      );
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to like post' });
  }
});

// COMMENT POST
router.post('/:id/comment', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.comments.push({
      userId: req.user.userId,
      username: req.user.name,
      handle: req.user.handle,
      text: req.body.text,
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to comment' });
  }
});

export default router;
