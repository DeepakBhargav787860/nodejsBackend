import express from 'express'
const getRouter=express.Router()
import multer from 'multer'
const storage = multer.memoryStorage();
const upload = multer({ storage });
import cloudinary from '../cloudnary/cloud.js'
import streamifier from 'streamifier'
import User from "../models/model.js"


getRouter.post("/getDataById",async(req,res)=>{
     try {
      const data=await User.find();
     res.json(data)  
     }  catch(err) {
      res.status(500).json({message:err.message})
     }
})

// POST /users – Create a new user
getRouter.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /users – Get all users
getRouter.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



getRouter.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { name, email } = req.body;

    const streamUpload = (buffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'deepakbhargav',
            upload_preset: 'deepak_audio',
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(buffer).pipe(stream);
      });

    const result = await streamUpload(req.file.buffer);

    const newImage = new User({
      name,
      email,
      filePath: result.secure_url,
    });

    await newImage.save();

    res.json({ message: 'Uploaded successfully', data: newImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default getRouter;