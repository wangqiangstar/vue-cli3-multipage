
// import 'promise-polyfill/src/polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
// import Antd from 'ui-vue-antd';
// import 'ui-vue-antd/dist/antd.css';
import VueLazyload from 'vue-lazyload';
// import fullscreen from 'vue-fullscreen'
// import cookies from 'js-cookie';
import Toast from '../service/comp/toast';

import store from '../store';
import Service from 'service';
// import utils from 'src/utils';
import filter from '../filter';



// process.env.NODE_ENV !== 'production' && require('src/mock')

const toast = new Toast();

// Vue.use(fullscreen);
Vue.use(VueRouter);
// Vue.use(Antd);
Vue.use(VueLazyload);

Vue.prototype.$service = Service;
// Vue.prototype.$utils = utils;
Vue.prototype.$toast = toast;

// 过滤器
filter(Vue);
Vue.config.productionTip = false
Vue.config.devtools = true;

// 创建埋点需要的标识
// function createMaidian(userInfo) {
//   let $dom = document.getElementById('maidian_page');
//   let $maidianPage;
//   if (!$dom) {
//     $maidianPage = document.createElement('div');
//     $maidianPage.id = 'maidian_page';
//     $maidianPage.setAttribute('data-uid', userInfo.userId);
//     $maidianPage.style.display = 'none';
//     document.body.appendChild($maidianPage);
//   } else {
//     $maidianPage = $dom;
//     $maidianPage.setAttribute('data-uid', userInfo.userId);
//     $maidianPage.style.display = 'none';
//   }
// }

/**
 * 埋点操作data-pad
 */
// function setPageId(to) {
//   const meta = to.meta;
//   // const pad = to.meta.pad;
//   const pathname = utils.getPathName();
//   const pad = utils.getPad(pathname, to.name, to.path);
//   const query = to.query;

//   if(meta.maidian_skip) {
//     return false;
//   }
//   if (pad) {
//     document.getElementById('maidian_page').setAttribute('data-pad', pad);
//     if(query) {
//       document.getElementById('maidian_page').setAttribute('data-pp1', encodeURIComponent(JSON.stringify(query)));
//     }
//     if(!document.getElementById('alilogJs')) {
//       utils.appendScript('alilogJs', '//resource.aixuexi.com/alilog.v2.js', true)
//         .then(() => {
//           console.log('appendScript alilog.v2.js');
//           window.TrackerUtil.send_track(document.getElementById('maidian_page'));
//         })
//     }else {
//       window.TrackerUtil.send_track(document.getElementById('maidian_page'));
//     }
//   }
// }

/**
 * router加载之前执行
 * @param {Object} to to
 * @param {Object} from from
 * @param {Function} next next
 * @returns {Null} null
 */
// async function beforeEach(to, from, next) {
//   const token = cookies.get('token');
//   const ptpc = cookies.get('ptpc');
//   if(to.meta.allowNoLogin) {
//     next()
//     return;
//   }else if (!token && !ptpc) {
//     window.location.href = '//www.aixuexi.com/logout.html';
//   }
//   let result = await store.dispatch('user/getPageAccess');
//   /* result.status 备注：403 无权访问; 200 帐号正常无需拦截; 0 帐号已冻结 ; 3 帐号即将冻结；1 即将到期 ; 2 帐号已到期 */
//   /* result.info 备注：status =1 帐号将要到期的时间, status = 3 距离帐号冻结还差几天 ;其他状态放空字符串 */
//   if (result.status !== 403) {
//     let userInfo = await store.dispatch('user/fetchUserInfo');
//     createMaidian(userInfo);
//     const isTeacher = userInfo.roles.indexOf('teacher') !== -1;
//     const isManage = userInfo.roles.indexOf('manage') !== -1;
//     const isSuperManage = userInfo.roles.indexOf('super_manager') !== -1;
//     const isDt = userInfo.roles.indexOf('dt_assistant') !== -1;

//     // 判断是否为白名单内用户
//     if (!userInfo.prepare && !to.meta.pass) {
//       window.location.href = '//bk.aixuexi.com';
//     }

//     // 获取班级数量
//     let classNumInfo = await store.dispatch('user/getClassNum');
//     userInfo = Object.assign({}, userInfo, { pageAccess: result, classNumInfo: classNumInfo });
//     await store.commit('user/updateUserInfo', userInfo);

//     // 获取新手引导
//     let guideOptions = await store.dispatch('common/getGuideOption');
//     userInfo = Object.assign({}, userInfo, { guideOptions: guideOptions });
//     await store.commit('user/updateUserInfo', userInfo);

//     // 只有双师助教没有教师和管理员，并且没有班级时，提示创建班级
//     if (result.status === 200 && isDt && !isManage && !isSuperManage && !isTeacher && classNumInfo.classNum === 0 && to.name !== 'unauthorized') {
//       window.location.href = 'unauthorized.html#/noclazz';
//     }

//     // 账号到期或者没有教师角色的管理员
//     if ((result.status === 2 || (!isTeacher && !isDt && isManage & !isSuperManage)) && to.name !== 'unauthorized') {
//       window.location.href = 'unauthorized.html';
//     } else {
//       next();
//     }
//   } else {
//     window.location.href = '//www.aixuexi.com/logout.html';
//   }
// }

/**
 * router加载之前执行
 * @param {Object} to current router
 * @param {Object} from last router
 * @returns {Null} null
 */
// function afterEach(to, from) {
//   setTimeout(() => {
//     setPageId(to);
//   }, 0)
//   // 每5分钟轮询一下接口，防止用户信息被盗用
//   if(!window.checkTimer && !to.meta.allowNoLogin) {
//     window.checkTimer = setInterval(()=> {
//       store.dispatch('user/fetchUserInfo')
//     }, 1000 * 60 * 5)
//   }
// }

export default (option) => {
  const { routes, App } = option;

  // router实例
  const router = new VueRouter(routes);

  // 加载之前执行
//   router.beforeEach(beforeEach);

  // 加载之后执行
//   router.afterEach(afterEach);

  /* eslint-disable no-new */
  console.log(222)
  new Vue({
    store,
    router,
    render: (h) => h(App)
  }).$mount('#app');
};
