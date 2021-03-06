const Pages = require('./pages.controller');

module.exports=function (router) {
    router.post('/page', Pages.createPage);
    router.get('/pages', Pages.getAllPages);
    router.get('/page/:pageId', Pages.getPageDetails);
    router.delete('/page/:pageId', Pages.deletePage);
}