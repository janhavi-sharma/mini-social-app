export const createPost = async (req, res) => {
  try {
    const { text, image } = req.body;

    if (!text && !image) {
      return res.status(400).json({ message: 'Post cannot be empty' });
    }

    const post = await Post.create({
      userId: req.user.userId, 
      username: req.user.name,
      handle: req.user.handle,
      text,
      image,
      likes: 0,
      likedBy: [],
      comments: [],
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create post' });
  }
};
