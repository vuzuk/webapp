const Router = require("express").Router;
const route = Router();
const render = require('../../dist/SSR');

route.get('/', render.default);

module.exports = route;