const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blogger = models["blogger"];
const User = models["user"];
const Blog = models["blog"];
const Blog_bookmark = models["blog_bookmark"];

module.exports = (req, res) => {
    let blogId = parseInt(req.query["blogId"]);
    Blog
        .findById(blogId)
        .then((blog) => {
            if (!blog) {
                return res.status(404).json({status: false, msg: "blog not found"});
            }
            let whereObj = {
                blog_id: blogId
            };
            whereObj[req["user"]["isBlogger"] ? "blogger_id" : "user_id"] = req["user"]["id"];
            Blog_bookmark
                .findOrCreate({
                    where: whereObj,
                    logging: false
                })
                .spread((obj, created) => {
                    if (created) {
                        return res.status(200).json({status: true, msg: "blog bookmarked"});
                    }
                    obj
                        .destroy()
                        .then(() => {
                            return res.status(200).json({status: true, msg: "blog bookmark removed"});
                        })
                        .catch((err) => {
                            console.log(err);
                            return res.status(503).json({status: false, msg: "error in database"});
                        })
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(503).json({status: false, msg: "error in database"});
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        });
};