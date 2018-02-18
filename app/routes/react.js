const Router = require("express").Router;
const route = Router();
const render = require(process.env.APP_ROOT+'/dist/SSR');

route.get('/', render.default);
route.get('/signup',render.signup);
route.get('/login', render.login);
route.get('/profile', render.profile);
route.get('/food', render.categories.food);
route.get('/travel', render.categories.travel);
route.get('/tech', render.categories.tech);
route.get('/fashion', render.categories.fashion);

module.exports = route;