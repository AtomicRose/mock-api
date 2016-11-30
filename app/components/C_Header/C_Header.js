'use strict';
import './C_Header.scss';

import React from 'react';

import HttpRequest from '../../provider/http/HttpRequest';

class C_Header extends React.Component {
    render() {
        HttpRequest.get('http://localhost:3000/api/cms/userInfo').then(function(res){
            console.log(res);
        },function(){

        });
        HttpRequest.post('http://localhost:3000/api/cms/userInfo/222', {
            name: 'jack',
            age: 11
        }).then(function(res){
            console.log(res);
        },function(){

        });
        return (
            <div className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">MockApi</a>
                    </div>
                    {/*header-nav*/}
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">Link</a></li>
                            <li><a href="#">Link</a></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle">Dropdown <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = C_Header;