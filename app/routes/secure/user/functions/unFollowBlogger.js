const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blogger = models["blogger"];
const User = models["user"];

module.exports = (req, res) => {
    req["user"]
        .removeBlogger([parseInt(req.query["bloggerId"])], {
            logging: false
        })
        .then(() => {
            return res.status(200).json({status: true, msg: "unFollow successful"});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        })
};