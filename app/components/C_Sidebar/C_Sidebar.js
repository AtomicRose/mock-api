import './C_Sidebar.scss';

import SysService from '../../service/sys/SysService';
import Dialog from '../../provider/dialog/Dialog';
import PubSub from '../../provider/PubSub';
import StorageConfig from '../../config/StorageConfig';

import React from 'react';

class TagItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ct: this.props.currentTag
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ct: nextProps.currentTag
        });
    }

    render() {
        return (
            <li className={this.props.k == this.state.ct ? 'list-group-item active' : 'list-group-item'}
                onClick={()=>this.props.pClass.handleSelectTag(this.props.k, this.props.obj)}>
                <h4 className="list-group-item-heading">{this.props.k}</h4>
                <p className="list-group-item-text">{this.props.obj.fileDescription}</p>
            </li>
        )
    }
}

class C_Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagList: [],
            currentTag: StorageConfig.HEADER_NAV_STORAGE.getItem('currentTagName')
        }
    }

    componentWillMount() {
        this.renderTagList(StorageConfig.HEADER_NAV_STORAGE.getItem('currentSystemObj'));
        PubSub.subscribe('selectCurrentSystem', (msg, data)=> {
            this.renderTagList(data);
            for (let key in data) {
                this.handleSelectTag(key, data[key]);
                StorageConfig.SIDEBAR_TAG_STORAGE.putItem('currentTagName', key);
                StorageConfig.SIDEBAR_TAG_STORAGE.putItem('currentTagObj', data[key]);
                PubSub.publish('selectCurrentTag', data[key]);
                break;
            }

        });
    }

    renderTagList(obj) {
        var items = [];
        for (var key in obj) {
            items.push({
                k: key,
                o: obj[key],
                t: this
            });
        }
        this.setState({
            tagList: items
        })
        return items;
    }

    handleSelectTag(k, o) {
        StorageConfig.SIDEBAR_TAG_STORAGE.putItem('currentTagName', k);
        StorageConfig.SIDEBAR_TAG_STORAGE.putItem('currentTagObj', o);
        this.setState({
            currentTag: k
        });
        PubSub.publish('selectCurrentTag', o);
    }

    render() {
        let renderArray = [];
        let list = this.state.tagList;
        let navId = 0;
        for (let i = 0; i < list.length; i++) {
            renderArray.push(function (k, o, t) {
                return <TagItem key={'navId_' + navId++} pClass={t} k={k} obj={o} currentTag={t.state.currentTag}/>
            }(list[i].k, list[i].o, list[i].t));
        }
        return (
            <div className="sidebar-box">
                <ul className="list-group">
                    {renderArray}
                </ul>
            </div>
        );
    }
}

module.exports = C_Sidebar;