const Router = require("express").Router;
const route = Router();

// get trending blogs of a month (could be via category, blogger)       query = {categoryId, bloggerId, limit, offset}
route.get('/getTrendingBlogs', require("./functions/getTrendingBlogs"));
// get latest blogs of a month (could be via category, blogger)       query = {categoryId, bloggerId, limit, offset}
route.get('/getLatestBlogs', require("./functions/getLatestBlogs"));

// get blog     query = {blogId}
route.get('/getBlog/:bloggerName/:slug', require("./functions/getBlog"));
// get blogger details      params = {username}
route.get('/getBlogger/:username', require("./functions/getBlogger"));
// get blogs of blogger     req.query={bloggerId}
route.get('/getBlogsOfBlogger', require("./functions/getBlogsOfBlogger"));
// get blogs by category    req.param={categoryId}
route.get('/getBlogsByCategory/:categoryId/:offset/:limit', require("./functions/getBlogsByCategory"));


// check username   query = {username, isBlogger}
route.get('/checkUsername', require("./functions/checkUsername"));
// check email   query = {email, isBlogger}
route.get('/checkEmail', require("./functions/checkEmail"));
// check contact (for blogger only)   query = {contact}
route.get('/checkContact', require("./functions/checkContact"));

// get followers count   query = {bloggerId}
route.get('/blogger/followersWithFollowing', require('./functions/followersWithFollowing'));

module.exports = route;