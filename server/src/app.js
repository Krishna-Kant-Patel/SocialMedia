const express = require("express");
const app = express();
const cors = require("cors");
require('./db/conn');
const LoginData = require('./models/login');
const Post = require('./models/posts');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bodyParser = require('body-parser');


const port  = process.env.PORT || 8000;


app.use(express.json({limit: '25mb'}));
app.use(cors());

app.get("/", async (req, res) => {
    try {
        // Fetch data from MongoDB
        const data = await LoginData.find();
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post("/login", (req, res)=>{
    console.log(req.body);
    const user = new LoginData(req.body);
    user.save().then(()=>{
        res.status(200).send(user);
    }).catch((e)=>{
        res.status(500).send(e);
    })
    // res.send("response from other side");
});

app.get("/image", async (req, res) => {
    try {
        // Fetch data from MongoDB
        const data = await Post.find();
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
app.use("/uploads", async (req, res) => {
    const body = req.body;
    try {
      const newImage = await Post.create(body);
      newImage.save();
      res.status(201).json({message: "new image uploaded", createdPost: newImage});
    } catch (error) {
      res.status(409).json({
        message: error.message,
      });
    }
  });

//reset password

app.use(bodyParser.json());
app.post("/login", (req, res)=>{
    console.log(req.body);
    const user = new User(req.body);
    user.save().then(()=>{
        res.status(200).send(user);
    }).catch((e)=>{
        res.status(500).send(e);
    })
    // res.send("response from other side");
  });
  
  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cu.17bcs1796@gmail.com',
      pass: 'oxcd zigh xqcl dwfz',
    },
  });
  
  // Express route for handling forgot password
  app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await LoginData.findOne( {email} );
      console.log(user);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a unique token for password reset
      const token = crypto.randomBytes(20).toString('hex');
      const expirationTime = new Date(Date.now() + 3600000); // Token expires in 1 hour
  
      // Update user with reset token and expiration time
      user.resetPasswordToken = token;
      user.resetPasswordExpires = expirationTime;
      await user.save();
  
      // Send email with reset link
      const resetLink = `http://localhost:3000/reset-password/${token}`;
      const mailOptions = {
        from: 'cu.17bcs1796@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: ${resetLink}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  app.post('/api/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      // Find the user by the reset token
      const user = await LoginData.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() }, // Check if the token is still valid
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }
  
      
  
      // Update user's password and reset token fields
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      
      await user.save();
  
      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  //Delete Data
  app.delete('/delete/:id', async(req, res)=>{
    const { id } = req.params;
    try {
      console.log(id);
      const DeleteData=await Post.findByIdAndDelete(id)
      if(!req.params.id){
        return res.status(404).send("id not found");
      }
      res.send(DeleteData);
    } catch (error) {
      res.status(500).send(error);
      
    }
  })

  app.patch("/posts/:id", async(req, res)=>{
    try {
      const _id = req.params.id;
      const Updatepost = await Post.findByIdAndUpdate(_id,req.body);
      res.status(200).send(Updatepost);
    } catch (error) {
      res.status(500).send(error);
    }

  })

  //Like and comment
  app.put('/api/posts/:id/like', async (req, res) => {
    const postId = req.params.id;
  
    try {
      const post = await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/api/posts/:id/comment', async (req, res) => {
    const postId = req.params.id;
    const { text, user } = req.body;
  
    try {
      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: { text, user } } },
        { new: true }
      );
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }); 
  

app.listen(port, ()=>{
    console.log(`connection set up at ${port}`);
})