const models = process.env.APP_ROOT;
const Blog = models.blog;

module.exports = (req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    Blog
        .findById(req.body.blogId)
        .then(blog => {
            if (!blog) {
                return res.status(404).json({status: false, msg: "blog not found"});
            }
            blog
                .update({
                    images: JSON.stringify(["/images/blogs/"+req.file.fileName])
                },{
                    logging: false
                })
                .then(() => {
                    return res.status(200).json({status: true, msg: "image upload successfully"});
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