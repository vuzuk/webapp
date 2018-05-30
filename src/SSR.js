import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from "react-router-dom"
import template, {index} from './template';
import routes from './routes';
import isEmpty from './helpers/isEmpty';

export default function render(req,res) {
  const activeRoute = routes.find(route => matchPath(req.url, route));
  const {component: Component, title, required, redirectURL, fetchInitialData} = activeRoute;
  const data = req.user || {};
  let customData;  
  
  if(required && isEmpty(data)) {
    return res.redirect(redirectURL)
  }
  
  const promise = fetchInitialData ? fetchInitialData(req.path.split("/")) : Promise.resolve();
      
  promise.then(response => {
    customData = response ? response.data.msg[0] : {}
    const appString = renderToString(
      <StaticRouter location={req.url} context={{}}>
        <Component data={data} customData={customData}/>
      </StaticRouter>
    );
    res.send(template({
      body: appString,
      title: title || 'VUZUK',
      data,
      customData
    }));
  })
  .catch(err => {throw err})
};