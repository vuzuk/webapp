const Router = require("express").Router;
const route = Router();

const fns = {
    createBlogger: require("./functions/createBlogger"),
    createUser: require("./functions/createUser"),
};

route.post('/createBlogger', fns.createBlogger);
route.get('/createUser', fns.createUser);

module.exports = route;