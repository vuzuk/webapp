const Router = require("express").Router;
const route = Router();
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blogger = models["blogger"];


route.use(function (req, res, next) {
    if (!req["user"]["isBlogger"]) {     // person is a blogger
        return res.status(403).json({status: false, msg: "please upgrade to blogger account"});
    }
    next();
});

//Get Details
route.get('/getDetails', function (req, res) {
    Blogger
        .findAll({
            attributes: ["id", "username", "email", "contact", "isEmailVerified", "isContactVerified", "first_name",
                "last_name", "image", "category", "dob", "gender", "points"],
            where: {
                id: req.user.id
            },
            limit: 1,
            raw: true
        })
        .then((obj) => {
            if (obj.length === 0) {
                return res.status(400).json({status: true, msg: "Not found"});
            }
            return res.status(200).json({status: true, msg: obj});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
});

//Add Blog      body = {title, blog, categoryId, tags(stringified array), post_link, video_link, place, images}
route.post('/newBlog', require("./functions/newBlog"));
//update Blog      body = {blogId, title, blog, category_id, tags(stringified array)}
route.post('/updateBlog', require("./functions/updateBlog"));
//temporary delete a blog   query = {blogId}
route.get('/tempDeleteBlog', require('./functions/tempDeleteBlog'));
//undo delete a blog   query = {blogId}
route.get('/undoDeleteBlog', require('./functions/undoDeleteBlog'));


//update Blogger profile
// body = {first_name, last_name, gender, twitter, instagram, facebook}
route.post('/updateProfile', require("./functions/updateProfile"));

const FroalaEditor = require(process.env.APP_ROOT + '/externals/wysiwyg-editor/lib/froalaEditor.js');
route.post('/froala_upload', (req, res) => {
    FroalaEditor.Image.upload(req, "../app/db/uploads/images/blogs/", function (err, data) {
        // Return data.
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
        data.link = data.link.substr(17, data.link.length)
        return res.status(200).send(data);
    });
})

module.exports = route;