const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];

module.exports = (req, res) => {
    let limit = parseInt(req.query["limit"]), offset = parseInt(req.query["offset"]);
    let whereObj = {
        is_published: true,
        is_deleted: false,
        date_published: {
            $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
        }
    };
    if (req.query["categoryId"]) whereObj["category_id"] = parseInt(req.query["categoryId"]);
    if (req.query["bloggerId"]) whereObj["blogger_id"] = parseInt(req.query["bloggerId"]);
    Blog
        .findAll({
            attributes: ["id", "title", "images", "date_published", "views"],
            where: whereObj,
            order: [
                [Sequelize.fn('max', Sequelize.col('views')), 'DESC'],
            ],
            limit: limit,
            offset: offset,
            raw: true
        })
        .then((blogs) => {
            return res.status(200).json({status: true, msg: blogs});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};