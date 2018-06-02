const Router = require("express").Router;
const route = Router();

route.use(function (req, res, next) {
    if (req["user"]["isBlogger"]) {     // person is a blogger
        return res.status(403).json({status: false, msg: "please upgrade to user account"});
    }
    next();
});

//update likings      query = {likings(stringified array)}
route.post('/updateLikings', require("./functions/updateLikings"));


module.exports = route;