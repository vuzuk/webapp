const Router = require("express").Router;
const route = Router();
const render = require(process.env.APP_ROOT+'/dist/SSR');

route.get('/', render.default);

module.exports = route;