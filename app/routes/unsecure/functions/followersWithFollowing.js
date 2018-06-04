const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Follower = models['follower']
const User = models['user']
const Blogger = models['blogger']

module.exports = (req, res) => {
    let blogger_id = req.query['bloggerId'];
    let retval = {};
    Follower
        .findAndCountAll({
            where: {blogger_id},
            logging: false,
            raw: true
        })
        .then((result) => {
            retval['followers'] = result;
            Follower
                .findAndCountAll({
                    where: {b_user_id: blogger_id},
                    logging: false,
                    raw: true
                })
                .then((result2) => {
                    retval['following'] = result2;
                    return res.status(200).json({status: true, msg: retval});
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        })
};