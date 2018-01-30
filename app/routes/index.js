const Router = require("express").Router;
const route = Router();
const controllers = require("../db/controllers");

route.get('/', function (req, res) {
    res.send('hey you got it');
});

route.get('/addBlogger', controllers.bloggers.bloggers.create);

module.exports = route;