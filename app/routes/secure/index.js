const Router = require("express").Router;
const route = Router();
const routes = {
    blogger: require("./blogger"),
    user: require("./user")
};

route.use(function (req, res, next) {
    if (!req["user"]) {
        return res.status(403).json({status: false, msg: "please log in first"});
    }
    return next();
});

route.use('/blogger', routes.blogger);
route.use('/user', routes.user);

module.exports = route;