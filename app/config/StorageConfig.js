import Storage from '../provider/storage/Storage';

var StorageConfig = {
    HEADER_NAV_STORAGE: Storage.sessionStorage('mock_header_nav_storage'),
    SIDEBAR_TAG_STORAGE: Storage.sessionStorage('mock_sidebar_tag_storage')
};
module.exports = StorageConfig;