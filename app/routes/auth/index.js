const Router = require("express").Router;
const route = Router();

module.exports = (passport) => {
    const routes = {
        local: require("./functions/local")(passport),
        facebook: require("./functions/facebook")(passport),
        verify: require("./functions/verify")
    };

    route.use('/local', routes.local);
    route.use('/facebook', routes.facebook);
    route.use('/verification', routes.verify);

    return route;
};