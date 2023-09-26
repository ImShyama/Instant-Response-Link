const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminsSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, require: true, index:true, unique:true,sparse:true}, 
  password: {type: String, required: true}, 
  date: {type: Date, default: Date.now()}, 
});
const Admins = mongoose.model('admins', AdminsSchema);
// User.createIndexes();
module.exports = Admins