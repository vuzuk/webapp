const sequelize = require('sequelize');
const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models['blog']
const Like = models['like']
const Comment = models['comment']

module.exports = (req, res) => {
    let para = req['params']['para'];
    let order = [[sequelize.col('views'), 'DESC']];
    if(para === "likes"){
        order = [[sequelize.col('likes'), 'DESC']]
    }

    Blog
        .findAll({
            attributes: ["id", "title", "images", "date_published", "views", "slug", 'blogger_id', "likes"],
            where: {blogger_id: req['user']['id']},
            logging: false,
            limit: 10,
            include: [{
                model: Comment,
                attributes: ['comment']
            }],
            order: order,
        })
        .then((result) => {
            return res.status(200).json({status: true, msg: result});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        })
};