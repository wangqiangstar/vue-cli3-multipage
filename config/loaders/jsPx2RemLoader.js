const loaderUtils = require('loader-utils');

// 默认参数
const defaultopts = {
    remUnit: 192, 
    remFixed: 3, 
};

module.exports = function (source) {
    // 获取webpack配置好的参数
    const opts = loaderUtils.getOptions(this);
    // 将参数组合
    const config = Object.assign({}, defaultopts, opts);
    const ZPXRegExp = /\b(\d*\.?\d+)px\b/ig;
    let pxGlobalRegExp = new RegExp(ZPXRegExp.source, 'g');
    if (this.cacheable) {
        this.cacheable();
    }
    // 先test下有没有符合的如果有再进行替换
    if (pxGlobalRegExp.test(source)) {
        return source.replace(pxGlobalRegExp, ($0, $1) => {
            let val = $1 / config.remUnit;
            // // 精确到几位
            val = parseFloat(val.toFixed(config.remFixed));
            return val === 0 ? val : val + 'rem';
        });
    } else {
        return source;
    }
};