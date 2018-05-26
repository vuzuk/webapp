const Router = require("express").Router;
const route = Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.APP_ROOT + "/app/db/uploads/images/blogs")
    },
    filename: function (req, file, cb) {
        let exten = file.originalname.split(".").pop();
        cb(null, req.body["blogId"] + exten);
    }
});
const upload = multer({storage: storage});

route.use(function (req, res, next) {
    if (!req["user"]["isBlogger"]) {     // person is a blogger
        return res.status(403).json({status: false, msg: "please upgrade to blogger account"});
    }
    next();
});

//Add Blog      body = {title, blog, categoryId, tags(stringified array), post_link, video_link, place, images}
route.post('/newBlog', require("./functions/newBlog"));
//update Blog      body = {blogId, title, blog, category_id, tags(stringified array)}
route.post('/updateBlog', require("./functions/updateBlog"));
//temporary delete a blog   query = {blogId}
route.get('/tempDeleteBlog', require('./functions/tempDeleteBlog'));
//undo delete a blog   query = {blogId}
route.get('/undoDeleteBlog', require('./functions/undoDeleteBlog'));

// **** DISABLED ****
//upload pics for blog      body = {blogId}
// route.post('/upload/blogPic', upload.single('avatar'), require("./functions/uploadBlogPic"));

const FroalaEditor = require(process.env.APP_ROOT + '/externals/wysiwyg-editor/lib/froalaEditor.js');
route.post('/froala_upload',(req,res) => {
    FroalaEditor.Image.upload(req, "../app/db/uploads/images/blogs/", function(err, data) {
        // Return data.
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
        data.link = data.link.substr(17,data.link.length)
        return res.status(200).send(data);
    });
})

module.exports = route;