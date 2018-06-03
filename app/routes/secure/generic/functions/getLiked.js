const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog_like = models["blog_like"];

module.exports = (req, res) => {
    let whereObj = {};
    whereObj[req["user"]["isBlogger"] ? "blogger_id" : "user_id"] = req["user"]["id"];
    Blog_like
        .findAll({
            where: whereObj,
            logging: false
        })
        .then((results) => {
            return res.status(200).json({status: true, msg: results});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        })
};