import React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App/App';
import { BSignUp, RSignUp } from './components/SignUp';
import { BLogIn, RLogIn } from './components/LogIn';
import Profile from './components/Profile/Profile';
import BloggerProfile from './components/BloggerProfile/BloggerProfile'
import CreatePost from './components/CreatePost/CreatePost'
import { Food, Travel, Tech, Fashion } from './components/Categories';
import Post from './components/Post/Post';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
hydrate(<Router>
    <Switch>
        <Route exact path="/" component={App} />
        <Route path="/blogger/signup" component={BSignUp} />
        <Route path="/reader/signup" component={RSignUp} />
        <Route path="/blogger/login" component={BLogIn} />
        <Route path="/reader/login" component={RLogIn} />
        <Route path="/profile" component={Profile} />
        <Route path="/food" component={Food} />
        <Route path="/travel" component={Travel} />
        <Route path="/tech" component={Tech} />
        <Route path="/fashion" component={Fashion} />
        <Route path="/in/blogger" component={BloggerProfile} />
        <Route path="/create" component={CreatePost} />
        <Route path="/post" component={Post} />
    </Switch>
</Router>, document.getElementById('root'));

if(module.hot) {
    module.hot.accept();
}