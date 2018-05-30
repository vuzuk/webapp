const Op = require("sequelize").Op;
const sequelize = require('sequelize');
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Blogger = models["blogger"];
const Comment = models["comment"]
const render = require(process.env.APP_ROOT+'/dist/SSR');

module.exports = (req, res) => {
    let bloggerId = parseInt(req.query["bloggerId"]);
    Blog
        .findAll({
            attributes: ["id", "title", "images", "date_published", "views"],
            where: {
                blogger_id: bloggerId
            },
            include: [{
                model: Comment,
                // attributes: [[sequelize.fn('count', sequelize.col('blog_id')), 'count']],
            }]
        })
        .then((blogs) => {
            if (blogs.length === 0) {
                return res.status(400).json({status: true, msg: "blog not found"});
            }

            const myblogs = blogs.map((blog) => blog.get({ plain: true }));
            for(let i=0; i<myblogs.length; i++){
                myblogs[i]['comments'] = myblogs[i]['comments'].length;
            }

            // return render.default(req, res, {status: true, msg: blog})
            return res.status(200).json({status: true, msg: myblogs});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};