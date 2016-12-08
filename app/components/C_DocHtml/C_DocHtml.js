import './C_DocHtml.scss';
import SysService from '../../service/sys/SysService';
import Dialog from '../../provider/dialog/Dialog';
import PubSub from '../../provider/PubSub';
import StorageConfig from '../../config/StorageConfig';
import React from 'react';

let contrastTable = {
    system: 'API系统',
    fileTag: '分类标签',
    baseUri: '基础路径',
    fileDescription: '文档介绍',
    author: '修改者/时间',
    id: 'ID',
    requestType: '请求类型',
    method: '接口名称',
    uri: '请求路径',
    description: '接口说明',
    param: '请求参数',
    extra: '备注',
    editor: '修改者/时间'
};

class C_DocHtml extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allHtml: []
        }
    }

    componentWillMount() {
        if (StorageConfig.SIDEBAR_TAG_STORAGE.getItem('currentTagObj') && StorageConfig.SIDEBAR_TAG_STORAGE.getItem('currentTagObj').currentFile) {
            SysService.getFileDoc(StorageConfig.SIDEBAR_TAG_STORAGE.getItem('currentTagObj').currentFile).then((res)=> {
                this.renderDocHtml(res.results);
            }, (res)=> {
                dialog.toast(res.errorCode + res.errorMsg);
            });
        }
        PubSub.subscribe('selectCurrentTag', (msg, data)=> {
            SysService.getFileDoc(data.currentFile).then((res)=> {
                this.renderDocHtml(res.results);
            }, (res)=> {
                dialog.toast(res.errorCode + res.errorMsg);
            });
        });
    }

    renderDocHtml(docFileData) {
        let pathObj = docFileData.pathObj;
        let blockArray = docFileData.blockObj;
        let tempArray = [];
        let countId = 0;
        // for (let key in pathObj) {
        //     if (key == 'root' || key == 'dir' || key == 'base' || key == 'ext' || key == 'name') {
        //
        //     }else{
        //         tempArray.push(function (m, o) {
        //             return (<div key={'docId_' + countId++} className={'doc-' + m}>{o}</div>);
        //         }(key, pathObj[key]));
        //     }
        // }
        if (blockArray && blockArray.length) {
            let shouldTableHeader = false;
            for (let i = 0, len = blockArray.length; i < len; i++) {
                tempArray.push(function (o) {
                    let name = o.tag;
                    let text = '';
                    if (name === 'id') {
                        shouldTableHeader = true;
                    }
                    if (typeof o.value === 'string') {
                        text = o.value;
                        return (<div key={'docId_' + countId++} className={'doc-item doc-' + name}><span
                            className={"label label-" + name}>{contrastTable[name]}</span><span
                            className={"text text-" + name + " value-" + text}>{text}</span></div>)
                    }
                    if (typeof o.value === 'object' && o.tag === 'param') {
                        let paramArray = [];
                        if (shouldTableHeader) {
                            paramArray.push(<div key={'docId_' + countId++} className="param-header">
                                <div className="t-head">参数名称</div>
                                <div className="t-head">类型</div>
                                <div className="t-head">是否必填</div>
                                <div className="t-head">默认值</div>
                                <div className="t-headl">描述</div>
                            </div>)
                            shouldTableHeader = false;
                        }
                        for (let key in o.value) {
                            paramArray.push(function (k, v) {
                                return (<div key={'paramId_' + countId++}
                                             className={"params param-" + k}>{v}</div>)
                            }(key, o.value[key]));
                        }
                        return (<div key={'docId_' + countId++} className={'doc-' + name}>{paramArray}</div>)
                    }
                    return '';
                }(blockArray[i]));
            }
        }
        this.setState({
            allHtml: tempArray
        });
    }

    render() {
        return (
            <div className="container-fluid doc-html">
                {this.state.allHtml}
            </div>
        );
    }
}

module.exports = C_DocHtml;