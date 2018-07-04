const Router = require("express").Router;
const route = Router();
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blogger = models["blogger"];

// Calling Logging script
let logViews = require("./functions/logViews");
var now = new Date();
var millisTill12 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 0) - now;
if (millisTill12 < 0) {
    millisTill12 += 86400000; // it's after 12am, try 12am tomorrow.
}
setTimeout(function () {
    setInterval(logViews, 24 * 60 * 60 * 1000);
}, millisTill12);

// logViews()

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


// STATS APIs
// get top blogs by views/likes   params = {para (views/likes)}
route.get('/top/:para', require('./functions/top'));
// get last 5 days views   query = {}
route.get('/lastFiveDaysViews', (req, res) => res.status(200).json({status: true, msg: req['user']['views']}));


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