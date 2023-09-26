const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, require: true, index:true, unique:true,sparse:true}, 
  password: {type: String, required: true}, 
  date: {type: Date, default: Date.now()}, 
});
const User = mongoose.model('users', UserSchema);
// User.createIndexes();
module.exports = User