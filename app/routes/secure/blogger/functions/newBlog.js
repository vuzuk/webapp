const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Tag = models["tag"];

module.exports = (req, res) => {
    // creating the blog
    Blog
        .findOrCreate({
            where: {
                title: req.body.title,
            },
            defaults: {
                blog: req.body.blog,
                images: JSON.stringify([]),
                category_id: req.body.category_id,
                blogger_id: req.user.id
            },
            logging: false
        })
        .spread((blog, created) => {
            console.log("new unPublished Blog " + blog["id"]);
            if(!req.body["tags"]){
                return res.status(200).json({status: true, msg: "Blog Added without tags"});
            }
            // creating tags in db
            let tagsObjs = JSON.parse(req.body["tags"]).map((item) => {
                return {name: item};
            });
            Tag
                .bulkCreate(tagsObjs, {ignoreDuplicates: true})
                .then(() => {
                    // getting the saved tags from the database
                    Tag
                        .findAll({
                            where: {
                                name: {
                                    [Op.in]: JSON.parse(req.body.tags)
                                }
                            }
                        })
                        .then(tags => {
                            // creating associations of blog with the tags
                            blog
                                .setTags(tags)
                                .then(() => {
                                    return res.status(200).json({status: true, msg: "Blog Added"});
                                })
                                .catch((err) => {
                                    console.log(err);
                                    return res.status(503).json({status: false, msg: "error in database"})
                                })
                        })
                        .catch((err) => {
                            console.log(err);
                            return res.status(503).json({status: false, msg: "error in database"})
                        })
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