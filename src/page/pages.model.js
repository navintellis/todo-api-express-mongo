const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var pagesSchema = new Schema({
    pageName:{
        type:String,
        unique:true,
        required:true, 
    },
    tasks:[{
        description:{type:String,required:true},
        isCompleted:{type:Boolean,default:false},
    }]

});

module.exports= pagesSchema;