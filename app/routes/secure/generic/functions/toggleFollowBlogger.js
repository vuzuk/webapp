const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blogger = models["blogger"];
const User = models["user"];
const Follower = models['follower']

module.exports = (req, res) => {
    let bloggerId = req['query']['bloggerId'];
    let whereObj = {
        bloggerId: bloggerId
    };
    whereObj[req['user']['isBlogger'] ? 'b_user_id' : 'user_id'] = req['user']['id'];
    Follower
        .findOrCreate({
            where: whereObj,
            logging: false
        })
        .spread((obj, created) => {
            if (created) {
                return res.status(200).json({status: true, msg: "following now"});
            }
            obj
                .destroy()
                .then(() => {
                    return res.status(200).json({status: true, msg: "Un-following now"});
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        })
};