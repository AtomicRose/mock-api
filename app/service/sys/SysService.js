import envs from '../../config/envs';
import HttpRequest from '../../provider/http/HttpRequest';

var sysUri = envs.currentEnv.sys;

var SysService = {
    getContrast: function (url) {
        return HttpRequest.get({
            url: sysUri + url,
            data: ''
        });
    },
    getFileDoc: function (fileName) {
        return HttpRequest.get({
            url: sysUri + '/fileDoc/' + fileName,
            data: ''
        });
    },
    generateDoc: function (subDir) {
        return HttpRequest.get({
            url: sysUri + '/generateDocHtml' + (subDir ? '?' + subDir : ''),
            data: ''
        });
    }
};

module.exports = SysService;