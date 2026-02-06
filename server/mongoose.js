const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/credentials')
.then(()=> console.log('connected'))

const signUpSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
})
const User = mongoose.model('User',signUpSchema);

module.exports = User