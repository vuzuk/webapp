import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from "react-router-dom"
import template, {index} from './template';
import routes from './routes';
import isEmpty from './helpers/isEmpty';

export default function render(req,res) {
  const activeRoute = routes.find(route => matchPath(req.url, route));
  const {component: Component, title} = activeRoute;
  const context = {};
  const data = req.user || {};
  // console.log(data);
  const appString = renderToString(
    <StaticRouter location={req.url} context={context}>
      <Component data={data}/>
    </StaticRouter>
  );
  res.send(template({
    body: appString,
    title: title || 'VUZUK',
  }));
};