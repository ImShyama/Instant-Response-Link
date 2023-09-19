const mongoose = require('mongoose');
const { Schema } = mongoose;

const SettingsSchema = new Schema({
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
const Settings = mongoose.model('Settings', SettingsSchema);
// User.createIndexes();
module.exports = Settings