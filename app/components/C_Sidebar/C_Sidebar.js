import './C_Sidebar.scss';

import SysService from '../../service/sys/SysService';
import Dialog from '../../provider/dialog/Dialog';
import PubSub from '../../provider/PubSub';
import StorageConfig from '../../config/StorageConfig';

import React from 'react';

class C_Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagList:[]
        }
    }

    componentWillMount() {
        this.renderTagList(StorageConfig.HEADER_NAV_STORAGE.getItem('currentSystemObj'));
        PubSub.subscribe('selectCurrentSystem', (msg, data)=> {
            this.renderTagList(data);
        });
    }

    renderTagList(obj) {
        var items = [];
        var navId = 0;
        for (var key in obj) {
            items.push(function (k, o, t) {
                return (<li className="list-group-item" key={'nav_' + navId++} onClick={()=>t.handleSelectTag(k,o)}>
                        <h4 className="list-group-item-heading">{k}</h4>
                        <p className="list-group-item-text">{o.fileDescription}</p>
                    </li>)
            }(key, obj[key], this));
        }
        this.setState({
            tagList: items
        })
        return items;
    }

    handleSelectTag(k,o){
        console.log(o);
        StorageConfig.SIDEBAR_TAG_STORAGE.putItem('currentTagName', k);
        StorageConfig.SIDEBAR_TAG_STORAGE.putItem('currentTagObj', o);
        SysService.getFileDoc(o.currentFile).then(function(res){
            console.log(res);
            //TODO PubSub to the DocHtml component
        },function(res){
            dialog.toast(res.errorCode + res.errorMsg);
        });
    }

    render() {
        return (
            <div className="sidebar-box">
                <ul className="list-group">
                    {this.state.tagList}
                </ul>
            </div>
        );
    }
}

module.exports = C_Sidebar;