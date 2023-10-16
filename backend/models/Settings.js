const mongoose = require("mongoose");
const { Schema } = mongoose;

const SettingsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  logo: {
    type: String,
  },
  headersSettings: {
    fontSize: { type: String, default: "25px" },
    fontColor: { type: String, default: "#000" },
    fontFamily: { type: String, default: "sans-serif" },
  },
  header: {
    type: String,
  },
  description: {
    type: String,
  },
  descriptionSettings: {
    size: { type: String, default: "20px" },
    color: { type: String, default: "#000" },
    family: { type: String, default: "sans-serif" },
  },
  backgroundImage: {
    type: String,
  },
  background: {
    type: String,
  },
  leftFooter: [
    {
      leftFooterName: { type: String },
      leftFooterURL: { type: String },
    },
  ],

  leftFooterSetting: {
    size: { type: String, default: "16px" },
    color: { type: String, default: "#fff" },
    family: { type: String, default: "sans-serif" },
    background: { type: String, default: "blue" },
  },

  rightFooter: [
    {
      rightFooterName: { type: String },
      rightFooterURL: { type: String },
    },
  ],

  rightFooterSetting: {
    size: { type: String, default: "16px" },
    color: { type: String, default: "#fff" },
    family: { type: String, default: "sans-serif" },
    background: { type: String, default: "blue" },
  },

  paginationSetting: {
    size: { type: String, default: "16px" },
    color: { type: String, default: "#fff" },
    family: { type: String, default: "sans-serif" },
    background: { type: String, default: "blue" },
  },
  socialLinks: [
    {
      linkType: { type: String },
      linkUrl: { type: String },
    },
  ],
  search: {
    type: Boolean,
    default: false,
  },
  footer: {
    type: Boolean,
    default: false,
  },

  linksSettings: {
    size: { type: String, default: "16px" },
    color: { type: String, default: "#000" },
    family: { type: String, default: "sans-serif" },
    background: { type: String, default: "#fff" },
  },
});

module.exports = mongoose.model("Settings", SettingsSchema);
