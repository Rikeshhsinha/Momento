import express from 'express';
import multer from 'multer';
import uploadFile from './services/storage.services.js';
import postSchema from './models/post.models.js';

const app = express();

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
    })

export default app;