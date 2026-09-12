import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    image: {
    type: String,
    required: true,
  },
     caption: {
     type: String,
     required: false,
  },
});


const Post = mongoose.model('Post', postSchema);
export default Post;