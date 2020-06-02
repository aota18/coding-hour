const mongoose = require('mongoose');
const { Schema } = mongoose ;

const Session = new Schema({
    class: { type: Schema.Types.ObjectId, ref: 'Class' },  // id of class
    willJoin: [{ type: Schema.Types.ObjectId, ref: 'Account' }],  // list of account ids
    attended: [{ type: Schema.Types.ObjectId, ref: 'Account' }],  // list of account ids
    date: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});

Session.statics.register = function({classId, date}){
    const session = new this({
        class: classId,
        date: date
    });

    return session.save();
}

Session.statics.findBySessionId = function(sessionId){
    return this.findOne({
        _id: sessionId,
        deleted: false
    }).exec();
}

Session.statics.findByClassId = function(classId){
    return this.find({
        class: classId,
        deleted: false
    }).exec();
}

Session.statics.findBySessionIdWithAttended = function(sessionId){
    return this.findOne({
        _id: sessionId,
        deleted: false
    })
    .populate('attended')
    .exec();
}

Session.methods.toggleWillJoin = function(userId){
    const idx = this.willJoin.findIndex(e => e==userId);
    if(idx == -1)
        this.willJoin.push(userId);
    else
        this.willJoin.splice(idx,1);

    return this.save();
}

Session.methods.addAttendUsers = function(userList){
    this.attended = userList;

    return this.save();
}

module.exports = mongoose.model('Session', Session);