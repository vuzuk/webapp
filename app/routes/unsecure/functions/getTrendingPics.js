const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];


module.exports = (req, res) => {
    let limit = parseInt(req.params["limit"])
    let offset = parseInt(req.params["offset"]);
    let whereObj = {
        is_published: true,
        is_deleted: false,
    };
    if (req.query["categoryId"]) whereObj["category_id"] = parseInt(req.query["categoryId"]);
    if (req.query["bloggerId"]) whereObj["blogger_id"] = parseInt(req.query["bloggerId"]);
    Blog
        .findAll({
            attributes: ["id", "title", "images", "views", "likes"],
            where: whereObj,
            order: [[Sequelize.col('views'), 'DESC']],
            limit: limit,
            offset: offset,
        })
        .then((blogs) => {
            if (blogs.length === 0) {
                return res.status(400).json({status: true, msg: "blog not found"});
            }

            let myblogs = blogs.map((blog) => blog['images'][0])

            return res.status(200).json({status: true, msg: myblogs});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};