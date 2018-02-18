import React from 'react';
import { renderToString } from 'react-dom/server';
import template, {index} from './template';
import App from './components/App/App';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import Profile from './components/Profile/Profile';
import { Food, Travel, Tech, Fashion } from './components/Categories';
import BloggerProfile from './components/BloggerProfile/BloggerProfile';

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

export function bloggerProfile(req, res) {
  const appString = renderToString(<BloggerProfile />);
  res.send(template({
    body: appString,
    title: 'Blogger Profile - VUZUK',
  }));
}

export const categories = {
  food: (req,res) => {
    const appString = renderToString(<Food />);
    res.send(template({
      body: appString,
      title: 'Food - VUZUK',
    }));
  },
  travel: (req,res) => {
    const appString = renderToString(<Travel />);
    res.send(template({
      body: appString,
      title: 'Travel - VUZUK',
    }));
  },
  fashion: (req,res) => {
    const appString = renderToString(<Fashion />);
    res.send(template({
      body: appString,
      title: 'Fashion - VUZUK',
    }));
  },
  tech: (req,res) => {
    const appString = renderToString(<Tech />);
    res.send(template({
      body: appString,
      title: 'Tech - VUZUK',
    }));
  }
}