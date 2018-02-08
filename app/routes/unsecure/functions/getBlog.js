const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Blogger = models["blogger"];

module.exports = (req, res) => {
    let blogId = parseInt(req.query["blogId"]);
    Blog
        .findAll({
            attributes: ["id", "title", "blog", "images", "date_published", "created_at", "views"],
            where: {
                id: blogId
            },
            include: [{
                model: Blogger,
                attributes: ["id", "username", "first_name", "last_name", "image"]
            }],
            limit:1,
            raw: true
        })
        .then((blog) => {
            if (blog.length === 0) {
                return res.status(400).json({status: true, msg: "blog not found"});
            }
            return res.status(200).json({status: true, msg: blog});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};