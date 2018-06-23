const Op = require("sequelize").Op;
const sequelize = require('sequelize')
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const View = models["view"];
const Blogger = models['blogger']

module.exports = (req, res) => {
    let blogId = parseInt(req.query["blogId"]);
    Blog
        .findById(blogId)
        .then((blog) => {
            if (!blog) {
                return res.status(404).json({status: false, msg: "blog not found"});
            }
            let blogger_id = blog['blogger_id'];

            blog
                .increment('views', {by: 1})
                .then(() => {
                    if (!req['user']) {
                        return res.status(200).json({
                            status: true,
                            msg: "view added"
                        });
                    }

                    let whereObj = {
                        blog_id: blogId
                    };
                    whereObj[req["user"]["isBlogger"] ? "blogger_id" : "user_id"] = req["user"]["id"];
                    View
                        .findOrCreate({
                            where: whereObj,
                            logging: false
                        })
                        .spread((obj, created) => {
                            let pointIncCount = parseInt(process.env[(req["user"]["isBlogger"] ? "BLOGGER" : "USER") + "_BLOG_VIEW_POINTS"])
                            if (!created) {
                                pointIncCount = 0
                            }

                            // increment points of the user
                            req["user"]
                                .increment('view_points', {
                                    by: pointIncCount
                                })
                                .then(() => {
                                    // increment points of the blogger
                                    let pointIncCount = parseInt(process.env["BLOGGER_BLOG_VIEW_POINTS"])
                                    Blogger
                                        .update({
                                                view_points: sequelize.literal('view_points + ' + pointIncCount)
                                            },
                                            {
                                                where: {
                                                    id: blogger_id
                                                }
                                            })
                                        .then(() => {
                                            return res.status(200).json({
                                                status: true,
                                                msg: "view added and points incremented"
                                            });
                                        })
                                })
                        })
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        });
};