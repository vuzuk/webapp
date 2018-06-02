const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blogger = models["blogger"];
const User = models["user"];
const Blog = models["blog"];

module.exports = (req, res) => {
    // increment points of the user
    let pointIncCount = parseInt(process.env[(req["user"]["isBlogger"] ? "BLOGGER" : "USER") + "_BLOG_SHARE_POINTS"])
    req["user"]
        .increment('share_points', {
            by: pointIncCount
        })
        .then(() => {
            return res.status(200).json({
                status: true,
                msg: "share points incremented"
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        })
};