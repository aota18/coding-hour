const mongoose = require('mongoose');
const { Schema } = mongoose ;

const Session = new Schema({
    url: String,
    class: { type: Schema.Types.ObjectId, ref: 'Class' },  // id of class
    participants: [{ type: Schema.Types.ObjectId, ref: 'Account' }],  // list of account ids
    year: Number,
    semester: Number,
    from: { type: Date },
    to: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Session', Session);