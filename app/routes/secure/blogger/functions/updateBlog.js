const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Tag = models["tag"];

module.exports = (req, res) => {
    let blogId = parseInt(req.query["blogId"]);
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
                    date_updated: Date(),
                    is_published: false,
                    place: req.body.place,
                    images: req.body.images
                }, {
                    logging: false
                })
                .then((updatedBlog) => {
                    console.log("new unPublished Blog " + blogId);
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