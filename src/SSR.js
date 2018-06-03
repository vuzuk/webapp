import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from "react-router-dom"
import {staticHTML, dynamicHTML} from './template';
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
    customData = response ? response.data.msg : {};

    res.write(staticHTML({
      title: title || 'VUZUK',
      data,
      customData
    }))
    res.flush();

    const appString = renderToString(
      <StaticRouter location={req.url} context={{}}>
        <Component data={data} customData={customData}/>
      </StaticRouter>
    );

    res.write(dynamicHTML({
      body: appString
    }));
    res.end();
  })
  .catch(err => {throw err})
};