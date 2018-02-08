const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models["user"];
const Blogger = models["blogger"];

module.exports = (req, res) => {
    let contact = parseInt(req.query["contact"]);
    Blogger
        .findAll({
            where: {
                contact: contact
            },
            limit:1,
            attributes: ["id", "contact"],
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