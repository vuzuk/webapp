const Router = require("express").Router;
const route = Router();

// get trending blogs of a month (could be via category, blogger)       query = {categoryId, bloggerId, limit, offset}
route.get('/getTrendingBlogs', require("./functions/getTrendingBlogs"));
// get latest blogs of a month (could be via category, blogger)       query = {categoryId, bloggerId, limit, offset}
route.get('/getLatestBlogs', require("./functions/getLatestBlogs"));

// get blog     query = {blogId}
route.get('/getBlog', require("./functions/getBlog"));

// get blogger details      query = {bloggerId}
route.get('/getBlogger', require("./functions/getBlogger"));


module.exports = route;