import './C_Main.scss';

import SysService from '../../service/sys/SysService';
import Dialog from '../../provider/dialog/Dialog';
import PubSub from '../../provider/PubSub';
import StorageConfig from '../../config/StorageConfig';
import C_Sidebar from '../C_Sidebar/C_Sidebar';
import C_DocHtml from '../C_DocHtml/C_DocHtml';

import React from 'react';

class C_Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="main">
                <div className="main-sidebar">
                    <C_Sidebar/>
                </div>
                <div className="main-content">
                    <C_DocHtml/>
                </div>
            </div>
        );
    }
}

module.exports = C_Main;