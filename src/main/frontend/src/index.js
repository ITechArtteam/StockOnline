import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory} from 'react-router'
import configureStore from './store/configureStore'

import App from './components/App'
import Test from "./containers/Test";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="/login" component={Login}/>
                <Route path="/test" component={Test}/>
                <Route path="*" component={ NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

