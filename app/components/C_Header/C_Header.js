'use strict';
import './C_Header.scss';
import SysService from '../../service/sys/SysService';
import Dialog from '../../provider/dialog/Dialog';
import PubSub from '../../provider/PubSub';
import StorageConfig from '../../config/StorageConfig';

import React from 'react';

class C_Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navItems: [],
            currentSystem: StorageConfig.HEADER_NAV_STORAGE.getItem('currentSystemName') ? StorageConfig.HEADER_NAV_STORAGE.getItem('currentSystemName') : 'API-System',
            navItemClass: "dropdown-menu"
        }
    }

    componentWillMount() {
        this.getNavItems();
    }

    getNavItems() {
        SysService.getContrast('/contrastTable').then((res)=> {
            let listObj = res.results;
            var items = [];
            var navId = 0;
            for (var key in listObj) {
                items.push(function (k, o, t) {
                    return <li key={'nav_' + navId++}><a onClick={()=>t.handleSelectSystem(k, o)}>{k}</a></li>
                }(key, listObj[key], this));
            }
            this.setState({
                navItems: items
            });
        }, (res)=> {
            Dialog.toast(res.errorCode + res.errorMsg);
        });
    }

    handleCtrlNavItems() {
        this.setState({
            navItemClass: this.state.navItemClass == 'dropdown-menu' ? 'dropdown-menu show' : 'dropdown-menu'
        })
    }

    handleSelectSystem(key, contrastObj) {
        StorageConfig.HEADER_NAV_STORAGE.putItem('currentSystemObj', contrastObj);
        StorageConfig.HEADER_NAV_STORAGE.putItem('currentSystemName', key);
        this.setState({
            currentSystem: key,
            navItemClass: 'dropdown-menu'
        })
        PubSub.publish('selectCurrentSystem', contrastObj);
    }

    render() {
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
                                <a className="dropdown-toggle"
                                   onClick={()=>this.handleCtrlNavItems()}>{this.state.currentSystem}
                                    <span className="caret"></span></a>
                                <ul className={this.state.navItemClass}>
                                    {this.state.navItems}
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