const sequelize = require('sequelize');
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Blogger = models["blogger"];

module.exports = () => {
    Blog
        .findAll({
            attributes: ['blogger_id',
                sequelize.fn('sum', sequelize.col('views'))],
            group: ["Blog.blogger_id"],
            order: [['blogger_id']]
        })
        .then(result => {
            Blogger
                .findAll({
                    attributes: ["id", "views"],
                    order: [['id']]
                })
                .then((bloggers) => {
                    let i = 0;
                    bloggers.map((blogger) => {
                        blogger['views'] = JSON.parse(blogger['views']);
                        blogger['views'].shift();
                        blogger['views'].push(result[i]['views'])
                        blogger['views'] = JSON.stringify(blogger['views']);
                        return blogger;
                    })

                    bloggers
                        .save()
                        .then(() => {
                            console.log("successfully logged views");
                            return "success";
                        })
                })
        })
        .catch((err) => {
            console.log(err);
        })
};