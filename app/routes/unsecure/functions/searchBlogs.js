const Op = require("sequelize").Op;
const sequelize = require('sequelize');
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Comment = models["comment"];
const Blogger = models["blogger"];

module.exports = (req, res) => {
    let title = req.query['title'];
    let offset = parseInt(req.params['offset']);
    let limit = parseInt(req.params['limit']);

    title = title.replace(/%/g,"|");
    title = '(' + title + ')+';
    
    Blog
        .findAll({
            attributes: ["id", "title", "images", "date_published", "views", "slug", 'blogger_id', "likes"],
            where: {
                title:{
                    [Op.regexp]: title
                }
            },
            offset: offset,
            limit: limit,
            include: [{
                model: Comment,
                attributes: ['comment'],
            },{
                model: Blogger,
                attributes: ['username', 'first_name', 'last_name', 'image']
            }]
        })
        .then((blogs) => {
            if (blogs.length === 0) {
                return res.status(200).json({status: true, msg: "blog not found"});
            }

            const myblogs = blogs.map((blog) => blog.get({ plain: true }));
            for(let i=0; i<myblogs.length; i++){
                myblogs[i]['comments'] = myblogs[i]['comments'].length;
            }

            return res.status(200).json({status: true, msg: myblogs});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};