const mongoose = require('mongoose');
const { Schema } = mongoose ;

const Class = new Schema({
    name: String,
    participants: [{ type: Schema.Types.ObjectId, ref: 'Account' }],   // list of user ids
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],    // list of session ids
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],          // list of post ids
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});


Class.statics.register = function({userId, classname}){
    const clazz = new this({
        name: classname,
        participants: [userId]   // participants
        // sessions: [],         // sessions
        // posts: [],         // posts
    });

    return clazz.save();
};

Class.statics.joinUser = function({userId, classId}){
    const clazz = await this.findOne({'_id' : classId}).exec();

    clazz.participants.push(userId);

    return clazz.save();
}

module.exports = mongoose.model('Class', Class);