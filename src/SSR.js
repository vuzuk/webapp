import React from 'react';
import { renderToString } from 'react-dom/server';
import template, {index} from './template';
import App from './components/App/App';
import { BSignUp, RSignUp } from './components/SignUp';
import { BLogIn, RLogIn } from './components/LogIn';
import {InBloggerProfile, BloggerProfile, InReaderProfile} from './components/Profile';
import { Food, Travel, Tech, Fashion } from './components/Categories';
import CreatePost from './components/CreatePost/CreatePost';
import Post from './components/Post/Post';

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

export function bLogIn(req, res) {
  const appString = renderToString(<BLogIn />);
  res.send(template({
    body: appString,
    title: 'Blogger Login - VUZUK',
  }));
}

export function rLogIn(req, res) {
  const appString = renderToString(<RLogIn />);
  res.send(template({
    body: appString,
    title: 'Reader Login - VUZUK',
  }));
}

export function bloggerProfile(req, res) {
  const appString = renderToString(<BloggerProfile />);
  res.send(template({
    body: appString,
    title: 'Blogger Profile - VUZUK',
  }));
}

export function inBloggerProfile(req, res) {
  const appString = renderToString(<InBloggerProfile />);
  res.send(template({
    body: appString,
    title: 'Blogger Profile - VUZUK',
  }));
}

export function inReaderProfile(req, res) {
  const appString = renderToString(<InReaderProfile />);
  res.send(template({
    body: appString,
    title: 'Reader Profile - VUZUK'
  }))
}

export function createPost(req, res) {
  const appString = renderToString(<CreatePost />);
  res.send(template({
    body: appString,
    title: 'Create Post - VUZUk'
  }))
}

export function post(req, res) {
  const appString = renderToString(<Post />);
  res.send(template({
    body: appString,
    title: 'Post - VUZUk'
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