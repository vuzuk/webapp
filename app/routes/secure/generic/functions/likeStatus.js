const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Follower = models['follower']

module.exports = (req, res) => {
    let whereObj = {
        blog_id: parseInt(req.query['blogId'])
    };
    whereObj[req['user']['isBlogger'] ? 'blogger_id' : 'user_id'] = req['user']['id'];

    Follower
        .findAll({
            where: whereObj,
            logging: false
        })
        .then((result) => {
            return res.status(200).json({status: true, msg: result});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        })
};