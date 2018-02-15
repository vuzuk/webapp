const Router = require("express").Router;
const route = Router();
const render = require(process.env.APP_ROOT+'/dist/SSR');

route.get('/', render.default);
route.get('/signup',render.signup);
route.get('/login', render.login);
route.get('/profile', render.profile);
module.exports = route;