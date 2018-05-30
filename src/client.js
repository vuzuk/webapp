import React from 'react';
import { hydrate } from 'react-dom';
import routes from './routes';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

let data, customData;
if (__isBrowser__) {
    data = window.__INITIAL_DATA__;
    customData = window.__CUSTOM_DATA__;    
}

hydrate(<Router>
    <Switch>
        {
            routes.map(({path, exact, component: Component}) => {
                return (
                    <Route key={path} exact={exact} path={path} render={props => (
                        <Component {...props} data={data} customData={customData}/>
                    )} />
                )
            })
        }
    </Switch>
</Router>, document.getElementById('root'));

if(module.hot) {
    module.hot.accept();
}