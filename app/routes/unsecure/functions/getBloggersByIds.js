const Op = require("sequelize").Op;
const sequelize = require('sequelize');
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models["user"];
const Blogger = models["blogger"];
const render = require(process.env.APP_ROOT + '/dist/SSR');

module.exports = (req, res) => {
    let bloggerIds = JSON.parse(req.query["bloggerIds"]);
    Blogger
        .findAll({
            attributes: ["id", "username", "first_name", "last_name", "image"],
            where: {
                id: bloggerIds
            },
            logging: false
        })
        .then((bloggers) => {
            if (bloggers.length === 0) {
                return res.status(400).json({status: true, msg: "bloggers not found"});
            }

            return res.status(200).json({status: true, msg: bloggers});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};