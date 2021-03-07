const {v1: uuidv1} = require('uuid');
const Pages = require('./pages.dao');

exports.createPage=function (req, res, next) {
    const page = {
        pageName: req.body.pageName,
    };

    Pages.addPage(page, function(error, page){
        if(error){
            res.json({
                error
            });
        }
        res.json({
            message:"Page created successfully"
        });
    });
};

exports.deletePage = function (req, res, next) {
    const {pageId} = req.params;
    Pages.deletePage({_id:pageId},(error,page) => {
        if(error){
            res.json({
                error
            });
        }
        res.json({
            message:"Page deleted successfully"
        });
    })
}

exports.getPageDetails = (req, res, next) => {
    const {pageId:_id} = req.params;
    Pages.getPageById({_id},(error,page) => {
        if(error){
            res.json({
                error
            });
        }
        res.json({
            page
        });
    })
}

exports.getAllPages = (req, res, next) => {
    Pages.getAllPages((error,pages) => {
        if(error){
            res.json({
                error
            });
        }
        res.json({
            pages
        });
    })
}

exports.updatePageName = (req, res, next) => {
    const {pageId:_id} = req.params;
    const {pageName} = req.body;
    Pages.updatePageName({_id},{pageName}, (error,page) => {
        if(error){
            res.json({error});
        }
        res.json({
            message: 'Page Name updated successfully',
            page,
        });
    });
}

exports.manageTaskInPage = (req, res, next) => {
    const {pageId: _id} = req.params;
    const {taskId, task: description, isCompleted}=req.body;
    Pages.getPageById({_id},(error, inputPage) => {
        if(error){
            res.json({error});
            return
        }
        const page= inputPage.toJSON();
        page.tasks= page.tasks || [];
        if(taskId){
            let taskFound=false;
            page.tasks = page.tasks.map((inputTask) => {
                let task={...inputTask};
               if(inputTask._id.toString() === taskId){
                   taskFound=true;
                   if( description ) task.description=description;
                   if( typeof isCompleted !== 'undefined' && isCompleted != null) task.isCompleted = isCompleted; 
               } 
               return task;
            });
            if(!taskFound){
                res.json({
                    error: new Error('Task not found for given task id')
                });
                return;
            }
        } else {
            page.tasks.push({
                description,
                isCompleted: false,
            });
        }
        Pages.updateTasks(page.tasks, {_id}, (updateError, updatedPage) => {
           if(updateError){
               res.json(updateError);
           }
           res.json({
               message:'Task has been added successfully',
               page:updatedPage,
           });
        });
    });
}

exports.deleteTaskInPage=(req,res,next) => {
    const {pageId, taskId} = req.params;
    Pages.getPageById({_id:pageId}, (error, pageResult) => {
        if(error){
            res.json(error);
        }
        const page = pageResult.toJSON();
        let taskFound=false;
        const pageTaskCount=page.tasks.length;
        page.tasks=page.tasks.filter((task) => (task._id.toString() !== taskId));
        if(pageTaskCount === page.tasks.length){
            res.json(new Error('Task not found'));
        }
        Pages.updateTasks(page.tasks, {_id:pageId}, (error, updatedPage) => {
            if(error){
                res.json(error);
            }
            res.json({
                message:"Task deleted successfully",
                page:updatedPage,
            });
        })
    });
};