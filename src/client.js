import React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App/App';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import Profile from './components/Profile/Profile';
import { Food, Travel, Tech, Fashio } from './components/Categories';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
hydrate(<Router>
    <Switch>
        <Route exact path="/" component={App} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/profile" component={Profile} />
        <Route path="/food" component={Food} />
        <Route path="/travel" component={Travel} />
        <Route path="/tech" component={Tech} />
        <Route path="/fashion" component={Fashion} />
    </Switch>
</Router>, document.getElementById('root'));

if(module.hot) {
    module.hot.accept();
}