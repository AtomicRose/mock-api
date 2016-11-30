import extend from '../extend';

let HttpRequest = {
    get: function (url, options) {
        let promise = new Promise(function (resolve, reject) {
            request(resolve, reject, 'GET', url, '', options);
        });
        return promise;
    },
    post: function (url, data, options) {
        console.log(data);
        let promise = new Promise(function (resolve, reject) {
            request(resolve, reject, 'POST', url, data, options);
        });
        return promise;
    }
};

function request(resolve, reject, type, url, data, options) {
    var defaults = {
        async: true,
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        responseType: 'json'
    };
    extend(defaults, options);
    let oReq = new XMLHttpRequest();
    oReq.open(type, url, defaults.async);
    if (defaults.headers) {
        let headers = defaults.headers;
        for (let key in headers) {
            oReq.setRequestHeader(key, headers[key]);
        }
    }
    oReq.responseType = defaults.responseType;
    oReq.send(JSON.stringify(data));

    oReq.onreadystatechange = function () {
        if (oReq.readyState === 4) {
            if (oReq.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
    }
}

module.exports = HttpRequest;