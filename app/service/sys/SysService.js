import envs from '../../config/envs';
import HttpRequest from '../../provider/http/HttpRequest';

var SysService = {
    getContrast: function (url) {
        return HttpRequest.get({
            url: envs.currentEnv.sys + url,
            data: ''
        });
    },
    getFileDoc: function (fileName) {
        return HttpRequest.get({
            url: envs.currentEnv.sys + '/fileDoc/' + fileName,
            data: ''
        });
    }
};

module.exports = SysService;