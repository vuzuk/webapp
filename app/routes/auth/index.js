const Router = require("express").Router;
const route = Router();

module.exports = (passport, mailTransporter) => {
    const routes = {
        local: require("./functions/local")(passport, mailTransporter),
        facebook: require("./functions/facebook")(passport),
        verification: require("./functions/verification")(mailTransporter)
    };

    route.use('/local', routes.local);
    route.use('/facebook', routes.facebook);
    route.use('/verification', routes.verification);

    return route;
};