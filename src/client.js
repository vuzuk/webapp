import React from 'react';
import { hydrate } from 'react-dom';
import routes from './routes';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

class Main extends Component {
    constructor(props) {
        super(props);
    
        let data;
        if (__isBrowser__) {
          data = window.__INITIAL_DATA__;
        }
        
        this.state = {
          data
        }
      }
    
    render() {
        const { data } = this.state;
        <div>
            <Switch>
                {
                    routes.map(({path, exact, component: Component}) => {
                        return (
                            <Route key={path} user="fd" exact={exact} path={path} render={props =>(
                                <Component {...props} data={data}/>    
                            )} />
                        )
                    })
                }
            </Switch>
        </div>
    }
}

hydrate(<Router>
            <Main />
        </Router>,
    document.getElementById('root'));

if(module.hot) {
    module.hot.accept();
}