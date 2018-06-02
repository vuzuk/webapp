const Router = require("express").Router;
const route = Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(req['user'].isBlogger){
            cb(null, process.env.APP_ROOT + "/app/db/uploads/images/bloggers")
        }
        cb(null, process.env.APP_ROOT + "/app/db/uploads/images/users")
    },
    filename: function (req, file, cb) {
        let exten = file.originalname.split(".").pop();
        if(req.path === "/upload/coverPic"){
            return cb(null, "" + req.user.id + "Cover." + exten);
        }
        return cb(null, "" + req.user.id + "." + exten);
    }
});
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*4   // 4 MB (1024*1024*4 bytes)
    },
    fileFilter: (req, file, cb) => {
        if(!file.mimetype){
            return cb("unknown file type");
        }
        if(file.mimetype !== 'image/jpeg'){
            return cb(null, false)
        }

        return cb(null, true);
    }
});

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
// upload profile picture
route.post('/upload/profilePic', upload.single('avatar'), require("./functions/uploadProfilePic"));
// upload cover pic
route.post('/upload/coverPic', upload.single('avatar'), require("./functions/uploadCoverPic"));


// logout
route.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = route;