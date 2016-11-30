import React from  'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router';

import C_Header from './components/C_Header/C_Header';

class Layout extends React.Component {
    render() {
        return (
            <C_Header></C_Header>
        );
    }
}
;

class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/web" component={Layout}></Route>
            </Router>
        );
    }
}

ReactDOM.render(<App></App>, document.getElementById('root'));
