const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Comment = models["comment"];
const Comment_like = models["comment_like"];

module.exports = (req, res) => {
    let commentId = parseInt(req.query["commentId"]);
    Comment
        .findById(commentId)
        .then((comment) => {
            if (!comment) {
                return res.status(404).json({status: false, msg: "comment not found"});
            }
            let whereObj = {
                comment_id: commentId
            };
            whereObj[req["user"]["isBlogger"] ? "blogger_id" : "user_id"] = req["user"]["id"];
            Comment_like
                .findOrCreate({
                    where: whereObj,
                    logging: false
                })
                .spread((obj, created) => {
                    if (created) {
                        return res.status(200).json({status: true, msg: "comment liked"});
                    }
                    obj
                        .destroy()
                        .then(() => {
                            return res.status(200).json({status: true, msg: "comment unLiked"});
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
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        });
};