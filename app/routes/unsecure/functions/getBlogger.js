const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Blogger = models["blogger"];
const Follower = models["follower"];

module.exports = (req, res) => {
    let username = parseInt(req.params["username"]);
    Blogger
        .findAll({
            attributes: ["id","username","first_name","last_name","image","gender","email"],
            where: {
                username: username
            },
            limit: 1,
            raw: true
        })
        .then((blogger) => {
            if (blogger.length === 0) {
                return res.status(400).json({status: true, msg: "blogger not found"});
            }
            let objId = blogger[0]['id']
            Follower
                .findAndCountAll({
                    where: {
                        blogger_id: objId
                    },
                    logging: false
                })
                .then((result) => {
                    blogger.followers = result.count
                    Follower
                        .findAndCountAll({
                            where: {
                                b_user_id: objId
                            },
                            logging: false
                        })
                        .then((result) => {
                            blogger.following = result.count
                            return res.status(200).json({status: true, msg: blogger});
                        })
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};