const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Blogger = models["blogger"];

module.exports = (req, res) => {
    let bloggerId = parseInt(req.query["bloggerId"]);
    Blogger
        .findAll({
            attributes: ["id","username","first_name","last_name","image","gender","email"],
            where: {
                id: bloggerId
            },
            limit: 1,
            raw: true
        })
        .then((blogger) => {
            if (blogger.length === 0) {
                return res.status(400).json({status: true, msg: "blogger not found"});
            }
            return res.status(200).json({status: true, msg: blogger});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};