import { useState, useEffect } from 'react';
import '../styles/SocialFeed.css';
import { getPosts, createPost, likePost, commentPost } from '../services/api';

interface Post {
  _id: string;
  username: string;
  handle: string;
  createdAt: string;
  text?: string;
  image?: string;
  likes: number;
  comments: Array<{ username: string; handle: string; text: string }>;
  likedBy: string[];
}

export default function SocialFeed() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = user.id;
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ text: '', image: '' });
  const [showComments, setShowComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      console.log('POSTS RESPONSE:', data);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.text && !newPost.image) {
      alert('Please add text or an image');
      return;
    }

    setLoading(true);
    try {
      await createPost({ text: newPost.text, image: newPost.image }, token || '');
      setNewPost({ text: '', image: '' });
      fetchPosts();
    } catch (error) {
      console.error('Error creating post', error);
    }
    setLoading(false);
  };

  const handleLike = async (postId: string) => {
    try {
      await likePost(postId, token || '');
      fetchPosts();
    } catch (error) {
      console.error('Error liking post', error);
    }
  };

  const handleComment = async (postId: string) => {
    if (!commentText.trim()) return;

    try {
      await commentPost(postId, commentText, token || '');
      setCommentText('');
      fetchPosts();
    } catch (error) {
      console.error('Error commenting', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setNewPost({ ...newPost, image: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="social-feed">
      <header className="header">
        <div className="container header-content">  
          <h1 className="logo">Social Feed</h1>
          <button className="logout-button" onClick={() => {localStorage.clear(); window.location.href = '/';}}>
            <img src="/logout.png" alt="Logout" className="logout-icon" />
          </button>
        </div>
      </header>

      <div className="container">
        {/* Create Post */}
        <div className="create-post-section">
          <h2>Create Post</h2>
          <textarea
            className="post-textarea"
            placeholder="What's on your mind?"
            value={newPost.text}
            onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
          />
          {newPost.image && (
            <div className="image-preview">
              <img src={newPost.image} alt="Preview" />
              <button className="remove-image" onClick={() => setNewPost({ ...newPost, image: '' })}>
                ✕
              </button>
            </div>
          )}
          <div className="post-actions">
            <label className="image-upload-button">
              📸 Add Image
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
            <button className="post-button" onClick={handleCreatePost} disabled={loading}>
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="posts-feed">
          <h2>Feed</h2>
          {posts.length === 0 && <p>No posts yet! 👀</p>}
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <div className="post-user-info">
                  <div className="post-avatar">{post.username.charAt(0)}</div>
                  <div>
                    <div className="post-username">{post.username}</div>
                    <div className="post-handle">{post.handle}</div>
                    <div className="post-timestamp">{new Date(post.createdAt).toLocaleString()} </div>
                  </div>
                </div>
              </div>

              {post.text && <p className="post-text">{post.text}</p>}
              {post.image && (
                <div className="post-image">
                  <img src={post.image} alt="Post content" />
                </div>
              )}

              <div className="post-stats">
                <span>{post.likes} likes</span>
                <span>{post.comments.length} comments</span>
              </div>

              <div className="post-actions-bar">
                <button
                  className={`action-btn ${Array.isArray(post.likedBy) && post.likedBy.includes(currentUserId)? 'liked': ''}`}
                  onClick={() => handleLike(post._id)}
                >
                  {Array.isArray(post.likedBy) && post.likedBy.includes(currentUserId) ? '❤️' : '🤍'} Like
                </button>
                <button
                  className="action-btn"
                  onClick={() => setShowComments(showComments === post._id ? null : post._id)}
                >
                  💬 Comment
                </button>
              </div>

              {showComments === post._id && (
                <div className="comments-section">
                  <div className="comments-list">
                    {post.comments.map((comment, idx) => (
                      <div key={idx} className="comment">
                        <strong>
                          {comment.username} ({comment.handle}):
                        </strong>{' '}
                        {comment.text}
                      </div>
                    ))}
                  </div>
                  <div className="comment-input-section">
                    <input
                      type="text"
                      className="comment-input"
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleComment(post._id);
                      }}
                    />
                    <button className="comment-submit" onClick={() => handleComment(post._id)}>
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
