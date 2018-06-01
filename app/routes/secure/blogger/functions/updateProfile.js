const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blogger = models["blogger"];

// body = {first_name, last_name, category, gender, linkedIn, instagram, facebook}
module.exports = (req, res) => {
    let update = {};
    if (req.body['first_name']) {
        update['first_name'] = req.body['first_name']
    }
    if (req.body['last_name']) {
        update['last_name'] = req.body['last_name'];
    }
    if (req.body['category']) {
        update['category'] = req.body['category'];
    }
    if (req.body['gender']) {
        update['gender'] = req.body['gender'];
    }
    if (req.body['linkedIn']) {
        update['linkedIn'] = req.body['linkedIn'];
    }
    if (req.body['instagram']) {
        update['instagram'] = req.body['instagram'];
    }
    if (req.body['facebook']) {
        update['facebook'] = req.body['facebook'];
    }

    Blogger
        .findById(req['user']['id'])
        .then((blogger) => {
            if (!blogger) {
                return res.status(404).json({status: false, msg: "blogger not found"});
            }
            blogger
                .update(update, {
                    logging: false
                })
                .then((updatedBlogger) => {
                    return res.status(200).json({status: true, msg: "Blogger details updated"});
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(503).json({status: false, msg: "error in database"})
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};