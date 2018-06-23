const Op = require("sequelize").Op;
const sequelize = require('sequelize');
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models["user"];
const Blogger = models["blogger"];
const render = require(process.env.APP_ROOT + '/dist/SSR');

module.exports = (req, res) => {
    let userIds = JSON.parse(req.query["userIds"]);
    User
        .findAll({
            attributes: ["id", "username", "first_name", "last_name", "image"],
            where: {
                id: userIds
            },
            logging: false
        })
        .then((users) => {
            if (users.length === 0) {
                return res.status(400).json({status: true, msg: "users not found"});
            }

            return res.status(200).json({status: true, msg: users});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};