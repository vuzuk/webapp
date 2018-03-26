const Router = require("express").Router;
const route = Router();
const render = require(process.env.APP_ROOT+'/dist/SSR');

route.get('/', render.default);
route.get('/blogger/signup',render.bSignUp);
route.get('/reader/signup',render.rSignUp);
route.get('/blogger/login',render.bLogIn);
route.get('/reader/login',render.rLogIn);
route.get('/food', render.categories.food);
route.get('/travel', render.categories.travel);
route.get('/tech', render.categories.tech);
route.get('/fashion', render.categories.fashion);
route.get('/blogger', render.bloggerProfile);
route.get('/in/blogger', render.inBloggerProfile);
route.get('/in/reader',render.inReaderProfile);
route.get('/create', render.createPost);
route.get('/post',render.post);
route.get('/verify/phone',render.verification);

module.exports = route;