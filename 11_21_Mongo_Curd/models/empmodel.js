const mongoose = require('mongoose');

const employee =mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone :{
        type: Number,
        required : true
    }
},{timestamps: true });

module.exports = mongoose.model('Employee', employee);