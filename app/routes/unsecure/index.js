const Router = require("express").Router;
const route = Router();

// get trending blogs of a month (could be via category, blogger)       query = {categoryId, bloggerId}
route.get('/getTrendingBlogs/:offset/:limit', require("./functions/getTrendingBlogs"));
// get latest blogs of a month (could be via category, blogger)       query = {categoryId, bloggerId}
route.get('/getLatestBlogs/:offset/:limit', require("./functions/getLatestBlogs"));


// search a blog     query = {title}
route.get('/searchBlogs/:offset/:limit', require("./functions/searchBlogs"));
// get blog     query = {blogId}
route.get('/getBlog/:bloggerName/:slug', require("./functions/getBlog"));
// get blogs by ids (array)     req.query={blogIds (array)}
route.get('/getBlogsByIds', require("./functions/getBlogsByIds"));
// get blogger details      params = {username}
route.get('/getBlogger/:username', require("./functions/getBlogger"));
// get blogs of blogger     req.query={bloggerId}
route.get('/getBlogsOfBlogger', require("./functions/getBlogsOfBlogger"));
// get blogs by category    req.param={categoryId}
route.get('/getBlogsByCategory/:categoryId/:offset/:limit', require("./functions/getBlogsByCategory"));
// get blogs by tag    req.param={tag}
route.get('/getBlogsByTag/:tag', require("./functions/getBlogsByTag"));


// check username   query = {username, isBlogger}
route.get('/checkUsername', require("./functions/checkUsername"));
// check email   query = {email, isBlogger}
route.get('/checkEmail', require("./functions/checkEmail"));
// check contact (for blogger only)   query = {contact}
route.get('/checkContact', require("./functions/checkContact"));

// get followers count   query = {bloggerId}
route.get('/blogger/followersWithFollowing', require('./functions/followersWithFollowing'));

module.exports = route;