const Router = require("express").Router;
const route = Router();

route.use(function (req, res, next) {
   if(req["user"].username !== process.env.ADMIN_USERNAME){
       return res.status(403).json({status: false, msg: "access denied"});
   }
    return next();
});

//permanently delete blog   query = {blogId}
route.get('/permDeleteBlog', require('./functions/permDeleteBlog'));

//publish a blog    query = {blogId}
route.get('/publishBlog', require("./functions/publishBlog"));
//unPublish a blog    query = {blogId}
route.get('/unPublishBlog', require("./functions/unPublishBlog"));


module.exports = route;