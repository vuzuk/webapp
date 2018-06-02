const sequelize = require('sequelize');
const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models['blog']
const Like = models['like']

module.exports = (req, res) => {
    let para = req['params']['para'];
    let order = sequelize.fn('max', sequelize.col('views'));
    if(para === "likes"){
        order = sequelize.fn('max', sequelize.col('likes'))
    }

    Blog
        .findAll({
            where: {blogger_id: req['user']['id']},
            logging: false,
            limit: 10,
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