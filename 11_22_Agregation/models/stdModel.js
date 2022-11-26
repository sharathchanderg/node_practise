const mongoose = require('mongoose');

const students = mongoose.Schema({
    //student_name: { type: mongoose.Schema.Types.ObjectId, ref: 'Marks'    },
    // id:{
    //     type: Number,
    //     required: true
    // },
    name:{
        type: String,
        index: true,
        required: true
    },
    branch:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    }
},{timestamps: true});
module.exports = mongoose.model('Students',students);
