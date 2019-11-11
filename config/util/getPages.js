const glob = require('glob')
let pages = {}
module.exports.pages = function () {
  glob.sync('./src/pages/*/*/main.js').forEach(filepath => {
    let fileList = filepath.split('/')
    
    let parentFileName = fileList[fileList.length - 3]
    let fileName = fileList[fileList.length - 2]
    pages[fileName] = {
      entry: `src/pages/${parentFileName}/${fileName}/main.js`,
      // 模板来源
      template: `src/pages/${parentFileName}/${fileName}/index.html`,
      // 在 dist/index.html 的输出
      filename: process.env.NODE_ENV === 'development' ? `${fileName}.html` : `${fileName}/index.html`,
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', fileName]
    }
  })
  return pages
}
