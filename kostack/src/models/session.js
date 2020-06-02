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

}

Session.methods.toggleWillJoin = function(userId){
    
}

Session.methods.checkWillJoin = function(userId){

}

Session.methods.numberOfWillJoin = function(){

}

Session.methods.addAttendUsers = function(userList){

}

Session.methods.getAttendUsers = function(){

}

module.exports = mongoose.model('Session', Session);