const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Blogger = models["blogger"];
const User = models["user"];
const Notification = models['notification']
const Comment = models['comment']

module.exports = (req, res) => {
    let whereObj = {};
    whereObj[req['user']['isBlogger'] ? 'b_user_id' : 'user_id'] = req['user']['id'];
    Notification
        .findAll({
            where: whereObj,
            limit: 10,
            logging: false
        })
        .then((notifications) => {
            Notification
                .update({seen: true}, {
                    where: whereObj,
                    logging: false
                })
                .then(() => {
                    let myNotifications = notifications.map((notif) => notif.get({plain: true}));
                    let blogIds = myNotifications.map((obj) => obj['blog_id'])
                    console.log(blogIds);
                    Blog
                        .findAll({
                            attributes: ["id", "title", "images", "date_published", "views", "slug", "blogger_id", "likes"],
                            where: {
                                id: blogIds
                            },
                            include: [{
                                model: Comment,
                                attributes: ['comment'],
                            }, {
                                model: Blogger,
                                attributes: ['username', 'first_name', 'last_name', 'image']
                            }]
                        })
                        .then((blogs) => {
                            if (blogs.length === 0) {
                                return res.status(400).json({status: true, msg: "not found"});
                            }

                            const myBlogs = blogs.map((blog) => blog.get({plain: true}));
                            for (let i = 0; i < myBlogs.length; i++) {
                                myBlogs[i]['comments'] = myBlogs[i]['comments'].length;
                            }

                            for (let i = 0; i < myBlogs.length; i++) {
                                myNotifications[i]['blog'] = myBlogs[i]
                            }

                            // return render.default(req, res, {status: true, msg: blog})
                            return res.status(200).json({status: true, msg: myNotifications});
                        })
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"});
        })
};