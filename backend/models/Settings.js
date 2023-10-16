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
  leftFooter: [{
    leftFooterName: {type: String},
    leftFooterURL: {type: String}
  }],
  rightFooter: [{
    rightFooterName: {type: String},
    rightFooterURL: {type: String},
  }],
  socialLinks: [{
    linkType: {type: String},
    linkUrl: {type: String}
  }],
  search:{
    type:Boolean,
    default:false
  },
  footer:{
    type:Boolean,
    default:false
  }
});


module.exports = mongoose.model('Settings', SettingsSchema);