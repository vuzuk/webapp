const Router = require("express").Router;
const route = Router();

route.use(function (req, res, next) {
    if (!req["user"]) {
        return res.status(403).json({status: false, msg: "please log in first"});
    }
    return next();
});

route.use('/blogger', require("./blogger"));
route.use('/user', require("./user"));
route.use('/generic', require("./generic"));

module.exports = route;