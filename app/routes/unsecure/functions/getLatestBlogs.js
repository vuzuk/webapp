const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Tag = models["tag"];
const Comment = models["comment"];
const Blogger = models["blogger"];


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
            attributes: ["id", "title", "images", "date_published", "views", "slug", 'blogger_id', "likes"],
            where: whereObj,
            order: [['date_published', 'DESC']],
            limit: limit,
            offset: offset,
            include: [{
                model: Tag,
                attributes: ["name"]
            }, {
                model: Comment,
                attributes: ['comment'],
            }, {
                model: Blogger,
                attributes: ['username', 'first_name', 'last_name', 'image']
            }]
        })
        .then((blogs) => {
            if (blogs.length === 0) {
                return res.status(400).json({status: true, msg: "blog not found"});
            }

            const myblogs = blogs.map((blog) => blog.get({ plain: true }));
            for(let i=0; i<myblogs.length; i++){
                myblogs[i]['comments'] = myblogs[i]['comments'].length;
            }

            return res.status(200).json({status: true, msg: myblogs});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};