const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Tag = models["tag"];
const Comment = models["comment"];
const Blogger = models["blogger"];


module.exports = (req, res) => {
    //get latest bloggers
    Blogger
        .findAll({
            attributes: ["id", "username", "first_name", "last_name", "image", "place"],
            order: [[Sequelize.col('id'), 'DESC']],
            limit: 5
        })
        .then((latestBloggers) => {
            if (latestBloggers.length === 0) {
                return res.status(400).json({status: true, msg: "bloggers not found"});
            }
            //get trending bloggers
            Blog
                .findAll({
                    attributes: ['blogger_id',
                        [Sequelize.fn('sum', Sequelize.col('views')), 'total_views']],
                    group: ["blog.blogger_id"],
                    order: [[Sequelize.col('total_views'), 'DESC']]
                })
                .then(result => {
                    if (result.length === 0) {
                        return res.status(400).json({status: true, msg: "bloggers not found"});
                    }

                    console.log(result.length);
                    console.log(result);
                    // console.log(result[0].dt);
                    // console.log(result[1].dt);

                    let len = result.length > 5 ? 5 : result.length
                    result = result.slice(0, len)
                    let bloggerIds = result.map(obj => obj.blogger_id)

                    Blogger
                        .findAll({
                            attributes: ["id", "username", "first_name", "last_name", "image", "place"],
                            where: {
                                id: bloggerIds
                            },
                            logging: false
                        })
                        .then(trendingBloggers => {
                            if (trendingBloggers.length === 0) {
                                return res.status(400).json({status: true, msg: "bloggers not found"});
                            }

                            let bloggers = {
                                trendingBloggers,
                                latestBloggers
                            }
                            return res.status(200).json({status: true, msg: bloggers});
                        })
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};