const mongoose = require('mongoose');
const { Schema } = mongoose ;

const Class = new Schema({
    name: String,
    year: Number,
    semester: Number,
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

Class.statics.findByYearAndSemester = function({year, semester}){
    return this.find({
        year: year,
        semester: semester,
        deleted: false
    }).exec();
}

Class.statics.findByClassName = function(name){
    return this.find({
        name: { $regex: "^"+name + '.*' }
    }).exec();
}

Class.statics.register = function({userId, classname, year, semester}){
    const clazz = new this({
        name: classname,
        participants: [userId],   // participants
        year: year,
        semester: semester
    });

    return clazz.save();
};

Class.methods.joinUser = function({userId}){
    const user = this.participants.find(e => {return e == userId});

    if(user == undefined)
        this.participants.push(userId);
  
    return this.save();
}

Class.methods.edit = function({name, year, semester}){
    this.name = name;
    this.year = year;
    this.semester = semester;

    return this.save();
}

Class.methods.delete = function(){
    this.deleted = true;

    return this.save();
}

module.exports = mongoose.model('Class', Class);