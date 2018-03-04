import React from 'react';
import { renderToString } from 'react-dom/server';
import template, {index} from './template';
import App from './components/App/App';
import { BSignUp, RSignUp } from './components/SignUp';
import LogIn from './components/LogIn/LogIn';
import Profile from './components/Profile/Profile';
import { Food, Travel, Tech, Fashion } from './components/Categories';
import BloggerProfile from './components/BloggerProfile/BloggerProfile';
import CreatePost from './components/CreatePost/CreatePost';

export default function render(req, res) {
  const appString = renderToString(<App />);
  res.send(index({
    body: appString,
    title: 'VUZUK',
  }));
}

export function bSignUp(req, res) {
  const appString = renderToString(<BSignUp />);
  res.send(template({
    body: appString,
    title: 'Blogger Sign Up - VUZUK',
  }));
}

export function rSignUp(req, res) {
  const appString = renderToString(<RSignUp />);
  res.send(template({
    body: appString,
    title: 'Reader Sign Up - VUZUK',
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

export function createPost(req, res) {
  const appString = renderToString(<CreatePost />);
  res.send(template({
    body: appString,
    title: 'Create Post - VUZUk'
  }))
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