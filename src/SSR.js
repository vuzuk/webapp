import React from 'react';
import { renderToString } from 'react-dom/server';
import template from './template';
import App from './components/App/App';
import SignUp from './components/SignUp/SignUp';

export default function render(req, res) {
  const appString = renderToString(<App />);
  res.send(template({
    body: appString,
    title: 'VUZUK',
  }));
}

export function signup(req, res) {
  const appString = renderToString(<SignUp />);
  res.send(template({
    body: appString,
    title: 'Sign Up - VUZUK',
  }));
}