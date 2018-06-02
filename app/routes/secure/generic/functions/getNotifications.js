const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blogger = models["blogger"];
const User = models["user"];
const Notification = models['notification']

module.exports = (req, res) => {
    let whereObj = {};
    whereObj[req['user']['isBlogger'] ? 'b_user_id': 'user_id'] = req['user']['id'];
    Notification
        .findAll({
            where: whereObj,
            limit: 10,
            logging: false
        })
        .then((notifications) => {
            Notification
                .update({seen: True}, {
                    where: whereObj,
                    logging: false
                })
                .then(() => {
                    return res.status(200).json({status: true, msg: notifications});
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        })
};