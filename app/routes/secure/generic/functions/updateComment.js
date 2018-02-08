const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blogger = models["blogger"];
const User = models["user"];
const Blog = models["blog"];
const Blog_like = models["blog_like"];
const Comment = models["comment"];

module.exports = (req, res) => {
    let comment = req.body["comment"], commentId = parseInt(req.body["commentId"]);
    Comment
        .findById(commentId)
        .then((obj) => {
            if (!obj || obj[req["user"]["isBlogger"] ? "blogger_id" : "user_id"] !== req["user"]["id"]) {
                return res.status(404).json({status: false, msg: "comment not found"});
            }
            obj
                .update({comment: comment}, {logging: false})
                .then(() => {
                    return res.status(200).json({status: true, msg: "comment updated"});
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
};