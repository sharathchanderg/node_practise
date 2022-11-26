const mongoose = require('mongoose');
//const ObjectId = mongoose.Schema.Types.ObjectId;
const{ObjectId} = require("mongoose");
//const convertedId = ObjectId(id)

const marks = mongoose.Schema({
    // itemId:{
    //     type: ObjectId,
    //     ref: 'Students',type: mongoose.Schema.Types.ObjectId,
    //     required: true
    //   },
    name:{
        type: String,
        required: true,
        index:true
    },
    st_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Students'},
    m_1:{
        type: String,
        required: true
    },
    physics:{
        type:String,
        required:true
    },
    chemistry:{
        type:Number,
        required:true
    }
},{timestamps: true});
module.exports = mongoose.model('Marks',marks);
