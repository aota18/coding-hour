const mongoose = require('mongoose');
const { Schema } = mongoose ;

const Class = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'Account' }],   // list of user ids
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],    // list of session ids
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],          // list of post ids
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});


module.exports = mongoose.model('Class', Class);