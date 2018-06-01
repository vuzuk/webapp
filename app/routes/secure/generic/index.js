const Router = require("express").Router;
const route = Router();


// view a blog      query = {blogId}
route.get('/viewBlog', require("./functions/viewBlog"));
// like a blog      query = {blogId}
route.get('/toggleBlogLike', require("./functions/toggleBlogLike"));
// bookmark a blog      query = {blogId}
route.get('/toggleBlogBookmark', require("./functions/toggleBlogBookmark"));

// comment on a blog    body = {comment, blogId, parentId}
route.post('/addComment', require("./functions/addComment"));
// update comment on a blog    body = {commentId, comment}
route.post('/updateComment', require("./functions/updateComment"));
// delete comment on a blog    query = {commentId}
route.get('/deleteComment', require("./functions/deleteComment"));
// like comment on a blog    query = {commentId}
route.get('/toggleCommentLike', require("./functions/toggleCommentLike"));

// get profile
route.get('/getProfile', require("./functions/getProfile"));

// logout
route.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = route;