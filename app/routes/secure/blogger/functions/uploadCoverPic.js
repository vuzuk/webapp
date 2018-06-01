const minify = require('minify-images');
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blogger = models['blogger'];

module.exports = (req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    if(!req.file){
        return res.status(503).json({status: false, msg: "error uploading image"})
    }

    minify.compress({
        src: req.file.path,
        dest: req.file.destination+'/',
        jpg: {
            quality: '90',
            maxMemory: 2048
        }
    }).then(files => {
        if(files.length === 0){
            return res.status(503).json({status: false, msg: "some image error occurred"})
        }

        Blogger
            .findById(req.user.id)
            .then(blogger => {
                if (!blogger) {
                    return res.status(404).json({status: false, msg: "blogger not found"});
                }
                blogger
                    .update({
                        cover_image: "/images/bloggers/"+req.file['filename']
                    },{
                        logging: false
                    })
                    .then(() => {
                        return res.status(200).json({status: true, msg: "cover image upload successfully"});
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
    }).catch(err => {
        console.log(err);
        return res.status(503).json({status: false, msg: "some image error occurred"})
    })
};