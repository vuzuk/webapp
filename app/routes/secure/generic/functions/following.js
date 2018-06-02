const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Follower = models['follower']

module.exports = (req, res) => {
    let whereObj = {};
    whereObj[req['user']['isBlogger'] ? 'b_user_id' : 'user_id'] = req['user']['id'];

    Follower
        .findAndCountAll({
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