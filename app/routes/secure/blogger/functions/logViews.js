const sequelize = require('sequelize');
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models["blog"];
const Blogger = models["blogger"];

module.exports = () => {
    console.log("logging values");

    Blog
        .findAll({
            attributes: ['blogger_id',
                [sequelize.fn('sum', sequelize.col('views')), 'dt']],
            group: ["blog.blogger_id"],
            order: [['dt']]
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
                        console.log("************************");
                        console.log(arr);
                        arr = JSON.parse(arr);
                        console.log(arr);
                        arr.shift();
                        if(!result[i]['views']){
                            arr.push(0)
                        }else{
                            arr.push(result[i]['views']-arr[3])
                        }
                        blogger['views'] = JSON.stringify(arr);
                        console.log(blogger['views']);
                        i += 1;
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