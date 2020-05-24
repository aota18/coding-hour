const mongoose = require('mongoose');
const { Schema } = mongoose ;

const File = new Schema({
    url: String,
    post: { type: Schema.Types.ObjectId, ref: 'Post' }  // list of post ids
});

module.exports = mongoose.model('File', File);