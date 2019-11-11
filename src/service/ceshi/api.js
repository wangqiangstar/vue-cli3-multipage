// import qs from 'qs';
import { fetch } from '../fetch';
import url from './url';
// const noloading = true;

export default {
  // 权限判断
  getPageAccess() {
    return fetch({
      url: url.getPageAccess,
      method: 'get'
    });
  },
  getStatusCheck() {
    return fetch({
      url: url.getStatusCheck,
      method: 'get'
    })
  }
};
