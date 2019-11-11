const loaderUtils = require('loader-utils');

// 默认参数
let defaultsProp = {
    remUnit: 192, 
    remFixed: 3, 
    minPixelValue: 1
}

const template = /<template>([\s\S]+)<\/template>/gi;
const ZPXRegExp = /\b(\d*\.?\d+)px\b/ig;

module.exports = function (source) {
    const opts = loaderUtils.getOptions(this)
    const config = Object.assign({}, defaultsProp, opts)
    let _source = ''
    if (template.test(source)) {
      _source = source.match(template)[0]
    }
    let pxGlobalRegExp = new RegExp(ZPXRegExp.source, 'g')
    console.log('進入stylePx')
    if (pxGlobalRegExp.test(_source)) {
      let $_source = _source.replace(pxGlobalRegExp, createPxReplace(config.remUnit, config.remFixed, config.minPixelValue))
      return source.replace(template, $_source)
    } else {
      return source
    }
}
function createPxReplace (remUnit, remFixed, minPixelValue) {
    return function ($0, $1) {
    //   if (!$1) return
    //   var pixels = parseFloat($1)
    //   if (pixels <= minPixelValue) return
      let val = $1 / remUnit;
      console.log(`${$0}=${$1}`)
      // // 精确到几位
      val = parseFloat(val.toFixed(remFixed));
      return val === 0 ? val : val + 'rem';
    }
}