const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Tag = models["tag"];
const Follower = models["follower"];
const Notification = models["notification"];

module.exports = (req, res) => {
    // creating the blog
    // req.body = {title, blog, category_id, tags, post_link, video_link, place, images}
    Blog
        .findOrCreate({
            where: {
                title: req.body.title,
            },
            defaults: {
                blog: req.body.blog,
                images: req.body.images,
                category_id: req.body.category_id,
                blogger_id: req.user.id,
                post_link: req.body.post_link ? req.body.post_link : null,
                video_link: req.body.video_link ? req.body.video_link : null,
                place: req.body.place ? req.body.place : null,
            },
            logging: false
        })
        .spread((blog, created) => {
            let tags = req.body["tags"];
            console.log("new unPublished Blog " + blog["id"]);
            if (!tags || tags.length === 0) {
                return res.status(200).json({status: true, msg: "Blog Added without tags"});
            }
            // creating tags in db
            let tagsObjs = tags.map((item) => {
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
                                    [Op.in]: req.body.tags
                                }
                            }
                        })
                        .then(tags => {
                            // creating associations of blog with the tags
                            blog
                                .setTags(tags)
                                .then(() => {
                                    // Finding the followers
                                    Follower
                                        .findAll({
                                            where: {
                                                blogger_id: req['user']['id']
                                            },
                                            attributes: ['user_id']
                                        })
                                        .then(users => {
                                            users = users.map((userObj) => {
                                                userObj['blog_id'] = blog.id
                                                userObj['blogger_id'] = req['user']['id']
                                                return userObj;
                                            });

                                            Notification
                                                .bulkCreate(users)
                                                .then(() => {
                                                    return res.status(200).json({status: true, msg: "Blog Added"});
                                                })
                                        })
                                })
                        })
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};