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

Class.statics.findByClassId = function(classId){
    return this.findOne({
        _id: classId,
        deleted: false
    }).exec();
}

Class.statics.register = function({userId, classname}){
    const clazz = new this({
        name: classname,
        participants: [userId]   // participants
        // sessions: [],         // sessions
        // posts: [],         // posts
    });

    return clazz.save();
};

Class.methods.joinUser = function({userId}){
    const user = this.participants.find(e => {return e == userId});

    if(user == undefined)
        this.participants.push(userId);

    return this.save();
}

module.exports = mongoose.model('Class', Class);