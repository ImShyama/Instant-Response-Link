const mongoose = require('mongoose');
const { Schema } = mongoose;

const SettingsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  logo: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  background: { type: String, require: true },
  socialLinks: [{ type: String, required: true }]
});


module.exports = mongoose.model('Settings', SettingsSchema);