const router = require('express').Router;
const route = router();

/* GET users listing. */
route.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = route;
