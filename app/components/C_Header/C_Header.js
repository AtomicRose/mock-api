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
            currentSystem: StorageConfig.HEADER_NAV_STORAGE.getItem('currentSystemName') ? StorageConfig.HEADER_NAV_STORAGE.getItem('currentSystemName') : '选择API系统',
            navItemClass: "dropdown-menu"
        }
    }

    componentWillMount() {
        this.getNavItems();
    }

    getNavItems(callback) {
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
            if(StorageConfig.HEADER_NAV_STORAGE.getItem('currentSystemName')){
                StorageConfig.HEADER_NAV_STORAGE.putItem('currentSystemObj', listObj[StorageConfig.HEADER_NAV_STORAGE.getItem('currentSystemName')]);
            }
            if (callback) {
                callback(listObj);
            }
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

    handleGenerateDoc() {
        SysService.generateDoc(encodeURIComponent(this.refs.subDir.value)).then((res)=> {
            if (res.status === 'ok') {
                Dialog.toast('生成文档成功');
                this.refs.subDir.value = '';
                this.getNavItems((listObj)=> {
                    this.handleSelectSystem(StorageConfig.HEADER_NAV_STORAGE.getItem('currentSystemName'), StorageConfig.HEADER_NAV_STORAGE.getItem('currentSystemObj'));
                });
            } else {
                Dialog.toast(res.errorCode + res.errorMsg);
            }
        }, (res)=> {
            Dialog.toast(res.errorCode + res.errorMsg);
        });
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
                            <li className="dropdown">
                                <a className="dropdown-toggle"
                                   onClick={()=>this.handleCtrlNavItems()}>{this.state.currentSystem}
                                    <span className="caret"></span></a>
                                <ul className={this.state.navItemClass}>
                                    {this.state.navItems}
                                </ul>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">帮助</a></li>
                        </ul>
                        <form className="navbar-form navbar-right" role="search">
                            <div className="form-group">
                                <input type="text" className="form-control" ref="subDir" placeholder="输入文档文件夹路径"/>
                            </div>
                            <button type="button" className="btn btn-default mgl-10"
                                    onClick={()=>this.handleGenerateDoc()}>生成文档
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = C_Header;