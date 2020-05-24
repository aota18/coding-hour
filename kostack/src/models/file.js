const mongoose = require('mongoose');
const { Schema } = mongoose ;

const File = new Schema({
    url: String,
    post: { type: Schema.Types.ObjectId, ref: 'Post' },  // list of post ids
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('File', File);