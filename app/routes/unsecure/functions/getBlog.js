const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Blogger = models["blogger"];
const User = models["user"];
const Tag = models["tag"];
const Comment = models["comment"]

module.exports = (req, res) => {
    let bloggerName = req.params["bloggerName"];
    let slug = req.params["slug"];
    Blogger
        .findAll({
            attributes: ["id", "username", "first_name", "last_name", "image", "facebook", "twitter", "instagram", "description"],
            where: {
                username: bloggerName,
            },
            include: [{
                model: Blog,
                where: {
                    slug: slug
                },
                include: [{
                    model: Tag,
                    attributes: ["name"]
                }, {
                    model: Comment,
                    include: [{
                        model: Blogger,
                        attributes: ["username", 'first_name', 'last_name', 'image']
                    }, {
                        model: User,
                        attributes: ["username", 'first_name', 'last_name', 'image']
                    }]
                }],
                attributes: ["id", "title", "blog", "images", "date_published", "created_at",
                    "views", "post_link", "video_link", "place", "likes", "category_id"]
            }],
            // raw: true
        })
        .then((blog) => {
            if (blog.length === 0) {
                return res.status(400).json({status: true, msg: "blog not found"});
            }


            blog = blog.map((node) => node.get({plain: true}));
            let blogOnly = blog[0]['blogs'][0];
            let blogId = blogOnly['id'];
            let value = blogOnly['blog'];

            while (value.indexOf("@@") !== -1) {
                let key = value[value.indexOf("@@") + 2];
                let i = 3;
                while (value[value.indexOf("@@") + i] !== '@') {
                    key = key + value[value.indexOf("@@") + i];
                    i++;
                }
                // console.log(key)

                let img = value.replace(`@@${key}@@`, `<img class="post-img" src="${blogOnly['images'][key]}" alt="Image">`)
                value = img;
            }
            value = value.replace(/##61##/g, "=")
            value = value.replace(/##62##/g, ":")
            value = value.replace(/##63##/g, "&")
            blogOnly['blog'] = value;

            // find the blog to add view points
            Blog
                .findById(blogId)
                .then((obj) => {
                    if (!obj) {
                        return res.status(404).json({status: false, msg: "blog not found"});
                    }
                    let blogger_id = blog['blogger_id'];
                    //increment views on the blog
                    obj
                        .increment('views', {by: 1})
                        .then(() => {
                            // increment points of the blogger
                            return res.status(200).json({status: true, msg: blog});
                        })
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(503).json({status: false, msg: "error in database"});
                });
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        });
};