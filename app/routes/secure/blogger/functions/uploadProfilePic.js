const models = process.env.APP_ROOT;
const Blogger = models['blogger'];

module.exports = (req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    Blogger
        .findById(req.user.id)
        .then(blogger => {
            if (!blogger) {
                return res.status(404).json({status: false, msg: "blogger not found"});
            }
            blogger
                .update({
                    images: "/images/bloggers/"+req.file.fileName
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