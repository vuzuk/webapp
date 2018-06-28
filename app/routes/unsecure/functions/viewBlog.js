const Op = require("sequelize").Op;
const sequelize = require('sequelize')
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const View = models["view"];
const Blogger = models['blogger']

module.exports = (req, res) => {
    let blogId = parseInt(req.query["blogId"]);
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
            //if not logged in, return
            if (!req['user']) {
                return res.status(200).json({
                    status: true,
                    msg: "view added"
                });
            }

            // add viewer to the database (View Table)
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
                    //if already added, return
                    if (!created) {
                        return res.status(200).json({
                            status: true,
                            msg: "view added and but points not incremented"
                        });
                    }

                    // increment points of the user
                    let pointIncCount = parseInt(process.env[(req["user"]["isBlogger"] ? "BLOGGER" : "USER")
                    + "_BLOG_VIEW_POINTS"]);
                    req["user"]
                        .increment('view_points', {
                            by: pointIncCount
                        })
                        .then(() => {
                            return res.status(200).json({
                                status: true,
                                msg: "view added and points incremented"
                            });
                        })
                })
        })
};