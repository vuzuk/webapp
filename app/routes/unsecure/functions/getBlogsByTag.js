const Op = require("sequelize").Op;
const sequelize = require('sequelize');
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Tag = models['tag'];
const Comment = models["comment"];
const Blogger = models["blogger"];

module.exports = (req, res) => {
    let tag = req.params['tag'];
    // let offset = parseInt(req.params['offset']);
    // let limit = parseInt(req.params['limit']);

    Tag.findAll({
        where: {
            name: tag
        },
        include: [{
            model: Blog,
            attributes: ["id", "title", "images", "date_published", "views", "slug", 'blogger_id', "likes"],
            // offset: offset,
            // limit: limit,
            through: {
                attributes: ["created_at"],
            },
            include: [{
                model: Comment,
                attributes: ['comment'],
            }, {
                model: Blogger,
                attributes: ['username', 'first_name', 'last_name', 'image']
            }]
        }]
    })
        .then((tags) => {
            if (tags.length === 0) {
                return res.status(400).json({status: true, msg: "blogs not found"});
            }

            const mytags = tags.map((tag) => tag.get({plain: true}));
            for (let i = 0; i < mytags[0]['blogs'].length; i++) {
                mytags[0]['blogs'][i]['comments'] = mytags[0]['blogs'][i]['comments'].length;
            }

            return res.status(200).json({status: true, msg: mytags});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};