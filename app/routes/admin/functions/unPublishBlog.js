const models = require(process.env.APP_ROOT + "/app/db/models");
const Blog = models.blog;

module.exports = (req, res) => {
    Blog
        .findById(req.query.blogId)
        .then(blog => {
            if (!blog) {
                return res.status(404).json({status: false, msg: "blog not found"});
            }
            blog
                .update({
                    is_published: false
                },{
                    logging: false
                })
                .then(() => {
                    return res.status(200).json({status: true, msg: "blog unPublished successfully"});
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(503).json({status: false, msg: "error in database"})
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({status: false, msg: "error in database"})
        })
};