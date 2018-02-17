import React from 'react';
import { renderToString } from 'react-dom/server';
import template, {index} from './template';
import App from './components/App/App';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import Profile from './components/Profile/Profile';

export default function render(req, res) {
  const appString = renderToString(<App />);
  res.send(index({
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

export function login(req, res) {
  const appString = renderToString(<LogIn />);
  res.send(template({
    body: appString,
    title: 'Login - VUZUK',
  }));
}

export function profile(req, res) {
  const appString = renderToString(<Profile />);
  res.send(template({
    body: appString,
    title: 'Profile - VUZUK',
  }));
}