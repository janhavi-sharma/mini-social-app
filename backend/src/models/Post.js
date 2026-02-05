import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: String,
    handle: String,
    text: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    text: {
      type: String,
      default: '',
    },

    image: {
      type: String,
      default: '',
    },

    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [], 
    },

    comments: {
      type: [commentSchema],
      default: [], 
    },
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);