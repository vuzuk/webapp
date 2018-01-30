const router = require('express').Router;
const route = router();

/* GET home page. */
route.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.send("hey there");
});

module.exports = route;
