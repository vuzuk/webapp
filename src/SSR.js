import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from "react-router-dom"
import template, {index} from './template';
import routes from './routes';

import App from './components/App/App';
import { BSignUp, RSignUp } from './components/SignUp';
import { BLogIn, RLogIn } from './components/LogIn';
import {InBloggerProfile, BloggerProfile, InReaderProfile} from './components/Profile';
import { Food, Travel, Tech, Fashion } from './components/Categories';
import CreatePost from './components/CreatePost/CreatePost';
import Verification from './components/Verification/Verification';
import Post from './components/Post/Post';

export default function render(req,res) {
  const activeRoute = routes.find(route => matchPath(req.url, route));
  const {component: Component, title} = activeRoute;
  const context = {};
  const appString = renderToString(
    <StaticRouter location={req.url} context={context}>
      <Component />
    </StaticRouter>
  );
  res.send(template({
    body: appString,
    title: title || 'VUZUK',
  }));
};