import express from 'express';
import multer from 'multer';
import uploadFile from './services/storage.services.js';
import postSchema from './models/post.models.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/create-post',upload.single('image'), async (req, res) => {


        const result = await uploadFile(req.file.buffer);
         
        const newPost = new postSchema({
            image: result.url,
            caption: req.body.caption,
        });
        
         await newPost.save();

        return res.status(201).json({
            message: 'Post created successfully',
        });
    });


    app.get("/get-posts", async (req, res) => {
  try {
    const posts = await postSchema.find();

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts: posts,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching posts",
      error: error.message,
    });
  }
});

export default app;