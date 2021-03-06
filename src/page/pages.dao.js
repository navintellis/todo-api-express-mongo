const mongoose = require('mongoose');
const pagesSchema = require('./pages.model');

pagesSchema.statics={
     addPage:function(data, cb){
        const page= new this(data);
        page.save(cb);
     },
     deletePage:function(query,cb){
         this.findOneAndDelete(query,cb);
     },
     getAllPages:function(cb){
        this.find({},cb);
     },
     getPageById:function({_id}, cb){
         this.findOne({_id},cb);
     },
     updatePageName:function({_id}, {pageName}, cb){
        this.findOneAndUpdate({_id},{$set:{pageName}}, {new:true}, cb); 
     },
     updateTasks:function(tasks, {_id}, cb) {
        this.findOneAndUpdate({_id},{$set:{tasks}}, {new:true}, cb);
     }
};

const pagesModel=mongoose.model('Pages',pagesSchema);
module.exports=pagesModel;