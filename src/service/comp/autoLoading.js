// 单例
let __instance__ = (function () {
  let instance;

  return (newInstance) => {
    if (newInstance) { instance = newInstance; }
    return instance;
  };
}());

export default class AutoLoading {
  constructor() {
    if (__instance__(null)) { return __instance__(null); }
    __instance__(this);

    this.loadding = _createNode();
    this.loadQueue = [];

    /**
     * 是否等待隐藏标识, 超时之后清空
     * @type {Boolean}
     */
    this.isWait = false;

    window.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(this.loadding);
      document.body.appendChild(_createStyle());
    });
  }

  show () {
    // 队里里面为0的时候, 开始阻止
    if (this.loadQueue.length === 0) {
      this.preventDocumentDefault();
    }
    this.loadQueue.push(1);
    this.loadding.style.display = 'block';

    if (!this.isWait) { this.waitToHide(); }
  }

  waitToHide () {
    this.isWait = true;

    clearTimeout(this.timer);

    // 隔5s如果还没反应请求成功就清空队列并隐藏
    this.timer = setTimeout(() => {
      clearTimeout(this.timer);

      this.loadQueue = [];
      this.end();
    }, 1000 * 10);
  }

  hide () {
    this.loadQueue.pop();

    if (this.loadQueue.length > 0) {
      return false;
    }

    this.end();
  }

  end () {
    this.loadding.style.display = 'none';
    this.isWait = false;
    this.removePrevent();
  }

  returnFalse () {
    return false;
  }

  /**
   * 清除 页面中的默认事件 , 让你乱点
   */
  preventDocumentDefault () {
    let returnFalse = this.returnFalse;
    document.addEventListener('touchstart', returnFalse);
    document.addEventListener('touchmove', returnFalse);
    document.addEventListener('touchend', returnFalse);
  }

  removePrevent () {
    let returnFalse = this.returnFalse;
    document.removeEventListener('touchstart', returnFalse);
    document.removeEventListener('touchmove', returnFalse);
    document.removeEventListener('touchend', returnFalse);
  }
}

function _createNode() {
  const _node = document.createElement('div');
  // const _child = document.createElement('div');

  // top: 50%;
  // left: 50%;
  // -webkit-transform: translate(-50%, -50%);
  // transform: translate(-50%, -50%);
  // padding: 15px;

  _node.setAttribute('style', `
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: none;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    z-index: 3888;
  `);

  const outerChildStyle = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70px;
    height: 70px;
    margin-top: -35px;
    margin-left: -35px;
    background-color: rgba(0, 0, 0, .7);
    border-radius: 10px;
  `;

  const innerChildStyle = `
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -15px;
    margin-left: -15px;
    height: 26px;
    width: 26px;
    display: inline-block;
    border-radius: 999px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    border: 2px solid rgba(159, 228, 21, .7);
    border-bottom-color: transparent;
    background-color: transparent;
    -webkit-animation: rotate 1.2s 0s linear infinite;
    animation: rotate 1.2s 0s linear infinite;
  `;
  // debugger
  _node.innerHTML = `<div style="${outerChildStyle}">
    <div style="${innerChildStyle}"></div>
  </div>`;

  // _node.appendChild(_child)
  _node.addEventListener('touchstart', (e) => {
    e.preventDefault();
  });

  return _node;
}

function _createStyle() {
  const _style = document.createElement('style');

  _style.innerText = `
        @-webkit-keyframes rotate {
            0% {-webkit-transform: rotate(0deg) scale(1);transform: rotate(0deg) scale(1);}
            50% {-webkit-transform: rotate(180deg) scale(1);transform: rotate(180deg) scale(1); }
            100% {-webkit-transform: rotate(360deg) scale(1);transform: rotate(360deg) scale(1); }
        }
    `;

  return _style;
}
