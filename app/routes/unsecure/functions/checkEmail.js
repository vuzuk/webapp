const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models["user"];
const Blogger = models["blogger"];

module.exports = (req, res) => {
    let email = req.query["email"], isBlogger = JSON.parse(req.query["isBlogger"]);
    model_to_use = isBlogger ? Blogger : User;
    model_to_use
        .findAll({
            where: {
                email: email
            },
            limit:1,
            attributes: ["id", "email"],
            raw: true
        })
        .then((obj) => {
            if (obj.length === 0) {
                return res.status(200).json({status: true, msg: false});
            }
            return res.status(200).json({status: true, msg: true});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};