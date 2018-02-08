const Router = require("express").Router;
const route = Router();

route.use(function (req, res, next) {
    if (req["user"]["isBlogger"]) {     // person is a blogger
        return res.status(403).json({status: false, msg: "please upgrade to user account"});
    }
    next();
});

//update lickings      query = {lickings(stringified array)}
route.post('/updateLickings', require("./functions/updateLickings"));

//user following a blogger      query = {bloggerId}
route.get('/followBlogger', require("./functions/followBlogger"));
//user unfollow a blogger      query = {bloggerId}
route.get('/unFollowBlogger', require("./functions/unFollowBlogger"));



module.exports = route;