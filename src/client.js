import React from 'react';
import { hydrate } from 'react-dom';
import routes from './routes';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

hydrate(<Router>
    <Switch>
        {
            routes.map(({path, exact, component: Component}) => {
                return (
                    <Route key={path} user="fd" exact={exact} path={path} component={Component} />
                )
            })
        }
    </Switch>
</Router>, document.getElementById('root'));

if(module.hot) {
    module.hot.accept();
}