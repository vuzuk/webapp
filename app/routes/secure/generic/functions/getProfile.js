const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const Blogger = models["blogger"];
const User = models["user"];

module.exports = (req, res) => {
    let obj = {
        username: req['user']['username'],
        email: req['user']['email'],
        first_name: req['user']['first_name'],
        last_name: req['user']['last_name'],
        image: req['user']['image'],
        cover_image: req['user']['cover_image'],
        dob: req['user']['dob'],
        gender: req['user']['gender'],
        contact: req['user']['contact'],
        view_points: req['user']['view_points'],
        comment_points: req['user']['comment_points'],
        share_points: req['user']['share_points'],
        referral_points: req['user']['referral_points'],
        isEmailVerified: req['user']['isEmailVerified'],
        isContactVerified: req['user']['isContactVerified']
    };

    if(req['user']['isBlogger']) {
        obj['category'] = req['user']['username'];
        obj['twitter'] = req['user']['email'];
        obj['instagram'] = req['user']['contact'];
        obj['facebook'] = req['user']['first_name'];
    }else{
        obj['liking'] = req['user']['liking'];
    }
    return res.status(200).json({status: true, msg: obj});
};