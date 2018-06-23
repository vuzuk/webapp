const sequelize = require('sequelize');
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Blogger = models["blogger"];

module.exports = () => {
    console.log("logging values");

    Blog
        .findAll({
            attributes: ['blogger_id',
                sequelize.fn('sum', sequelize.col('views'))],
            group: ["blog.blogger_id"],
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
                    bloggers = bloggers.map((blogger) => {
                        let arr = blogger['views'];
                        arr = JSON.parse(arr);
                        arr.shift();
                        arr.push(result[i]['views']-arr[3])
                        blogger['views'] = JSON.stringify(arr);
                        return blogger;
                    });

                    bloggers.map((blogger) => {
                        blogger
                            .save()
                            .then(() => {
                                // console.log("successfully logged views");
                            })
                    })
                })
        })
        .catch((err) => {
            console.log(err);
        })
};