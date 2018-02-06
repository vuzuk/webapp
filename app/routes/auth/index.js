const Router = require("express").Router;
const route = Router();

module.exports = (passport) => {
    const routes = {
        local: require("./functions/local")(passport),
        facebook: require("./functions/facebook")(passport)
    };

    route.use('/local', routes.local);
    route.use('/facebook', routes.facebook);

    return route;
};