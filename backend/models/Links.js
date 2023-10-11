const mongoose = require('mongoose');
const { Schema } = mongoose;

const LinksSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    },
    linkType: {
        type: String,
        require: true
    },
    removeDate: {
        type: String
    },
    animation: {
        type: String
    },
    thumbnail: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const clickDataSchema = mongoose.Schema({
    city: String,
    country: String,
    latitude: String,
    longitude: String,
    linkID: String,
    linkUrl: String
})

const Links = mongoose.model('links', LinksSchema);
const Clicks = mongoose.model('clicks', clickDataSchema);

module.exports = {
    Links,
    Clicks
}