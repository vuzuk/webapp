const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Tag = models["tag"];

module.exports = (req, res) => {
    let blogId = JSON.parse(req.query["blogId"]);
    Blog
        .findById(blogId)
        .then((blog) => {
            if (!blog) {
                return res.status(404).json({status: false, msg: "blog not found"});
            }
            blog
                .update({
                    title: req.body.title,
                    blog: req.body.blog,
                    category_id: req.body.category_id,
                    date_updated: Sequelize.DataTypes.NOW
                }, {
                    logging: false
                })
                .then((updatedBlog) => {
                    return res.status(200).json({status: true, msg: "Blog updated"});
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(503).json({status: false, msg: "error in database"})
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};