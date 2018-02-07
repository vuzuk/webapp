const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blogger = models["blogger"];
const User = models["user"];

module.exports = (req, res) => {
    req["user"]
        .update({
            lickings: JSON.parse(req.body["lickings"])
        }, {
            logging: false
        })
        .then((updatedUser) => {
            return res.status(200).json({status: true, msg: "lickings updated"});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        })
};