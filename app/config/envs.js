let all = {
    product: {},
    release: {},
    dev: {
        sys: 'http://localhost:3000/api/sys'
    }
};
function getCurrentEnv() {
    if (window.location.hostname == 'localhost') {
        return all.dev;
    }
    if (window.location.hostname.match('release')) {
        return all.release;
    }
    //default use the dev environment
    return all.dev;
}
let envs = {
    currentEnv: getCurrentEnv(),
    allEnvs: all
};

module.exports = envs;