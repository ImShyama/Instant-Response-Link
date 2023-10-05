const mongoose = require('mongoose');
const { Schema } = mongoose;

const SettingsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  logo: {
      type: String
  },
  header: {
      type: String
  },
  description: {
      type: String
  },
  backgroundImage: {
      type: String
  },
  background: {
    type: String
  },
  socialLinks: [{
    linkType: {type: String},
    linkUrl: {type: String}
  }]
});


module.exports = mongoose.model('Settings', SettingsSchema);