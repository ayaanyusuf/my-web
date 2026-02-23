const express = require("express");
const User = require('./mongoose.js');
const bcrypt = require('bcryptjs');
const app = express();
const cors = require('cors');
const corsOption = {
    origin: "http://localhost:5173"
}
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/credentials')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(cors(corsOption));
app.use(express.json());

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password,10);

    const exsistingUser = await User.findOne({ email });
    if (exsistingUser) {
        res.json({
            success:false,
            message:'Email already in use'
        })
    }
    else {
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        await user.save();
        res.json({
            success:true,
            message:'Your sign up was successful'
        })
    }
});

app.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email});
    if(!user){
        res.json({
            success:false,
            message:'No email found !'
        })
    }
    
    const matchPassword = await bcrypt.compare(password,user.password);

     if(!matchPassword){
        res.json({
            success:false,
            message:'Wrong Password'
        })
    }
    else{
        res.json({
            success:true,
            message:'You are being logged in...',
            userinfo:{
                name:user.username,
                email:user.email
            }
        })
    }
})

app.delete('/delete',async (req,res)=>{
    const {name,email} = req.body;
    const user = await User.deleteOne({email})
    if(user){
        res.json({
            success:true,
            message:'Your user is being deleted ...'
        })
    }

})

app.get('/signup', (req, res) => {
    res.send('POST YOUR REQUEST ON /users TO SIGN UP !!')
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})