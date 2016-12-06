import React from  'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router';

import C_Header from './components/C_Header/C_Header';
import C_Main from './components/C_Main/C_Main';

class Layout extends React.Component {
    render() {
        return (
            <div>
                <C_Header></C_Header>
                <C_Main></C_Main>
            </div>
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
