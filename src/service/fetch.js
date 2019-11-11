import axios from 'axios';
import cookies from 'js-cookie';
import AutoLoading from 'service/comp/autoLoading';
import Toast from 'service/comp/toast';

const autoloading = new AutoLoading();
const toast = new Toast();

export function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      // instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      // 所有的请求都会带上这些配置，比如全局都要用的身份信息等。
      headers: options.headers || {},
      timeout: 30 * 1000 // 30秒超时
    });
    instance.interceptors.request.use(
      (req) => {
        !options.noloading && autoloading.show();
        req.headers.token = cookies.get('token') || '';
        req.headers.ptpc = cookies.get('ptpc');
        req.headers.ptpcUserId = cookies.get('userId');
        return req;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    instance(options).then((response) => { // then 请求成功之后进行什么操作
      autoloading.hide();
      const headers = response.headers;
      const result = response.data;
      if(headers.ptpc) {
        cookies.set('ptpc', headers.ptpc, {domain: '.aixuexi.com'})
      }
      if(headers.token) {
        cookies.set('token', headers.token, {domain: '.aixuexi.com'})
      }
      if (result.status === 1 || result.status === 200 || result.status === 204) {
        resolve(result.body);
      } else {
        const duration = 5000;
        const errorCodeList = [1003, 1006, 1007, 1009, 1012, 100300001, 100300002, 100300003]
        if (errorCodeList.indexOf(result.errorCode) !== -1) {
          
          toast.show({
            message: result.errorMessage,
            duration: duration
          });
          setTimeout(() => {
            cookies.remove('token', {domain: '.aixuexi.com'});
            cookies.remove('ptpc', {domain: '.aixuexi.com'});
            window.location.href = `//www.aixuexi.com?loginBackUrl=${window.location.href}`;
          }, duration);
        }else {
          toast.show(result.errorMessage || '接口异常');
        }
        reject(result);
      }
    }).catch((error) => {
      autoloading.hide();
      toast.show('请求数据错误！');
      reject(error);
    });
  });
}
