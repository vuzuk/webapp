const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog_like = models["blog_like"];

module.exports = (req, res) => {
    let blogId = JSON.parse(req.query["blogId"]);
    Blog_like
        .findOne({
            where: {
                blogger_id: req["user"]["id"],
                blog_id: blogId
            },
            logging: false
        })
        .then((obj) => {
            if (!obj) {
                return res.status(400).json({status: false, msg: "blog not liked"});
            }
            obj
                .destroy()
                .then(() => {
                    return res.status(200).json({status: true, msg: "unlike success"});
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(503).json({status: false, msg: "error in database"});
                });
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        })
};