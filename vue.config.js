let pageMethod = require('./config/util/getPages.js');
let pages = pageMethod.pages();
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    outputDir: 'prod',
    lintOnSave: false,
    pages,
    publicPath: process.env.NODE_ENV === 'production'
    ? resolve('/prod/')
    : './',
    chainWebpack: (config) => {
        config.resolve.alias
            .set('service', resolve('src/service'))
            .set('assets', resolve('src/assets'))
        
        // 自定义loader  自动转换行内内联尺寸
        config.module.rule('jsPx2RemLoader-mobile')
        .test(/\.vue$/)
        .include.add(path.resolve(__dirname, `src/pages/mobile`))
        .end()
        .use(path.resolve(__dirname, 'config/loaders/jsPx2RemLoader'))
        .loader(path.resolve(__dirname, 'config/loaders/jsPx2RemLoader'))
        .options({
            remUnit: 75
        });

        config.module.rule('stylePx2RemLoader-pc')
        .test(/\.vue$/)
        .include.add(path.resolve(__dirname, `src/pages/pc`))
        .end()
        .use(path.resolve(__dirname, 'config/loaders/jsPx2RemLoader'))
        .loader(path.resolve(__dirname, 'config/loaders/jsPx2RemLoader'))
        .options({
            remUnit: 192
        });
        
    },
    devServer: {
        host: "0.0.0.0",
        port: 8082,
        disableHostCheck: true,
        proxy: {
            "/inception/*": {
                target: "http://bsk.aixuexi.com",
                ws: true,
                changeOrigin: true
            },
            "/Hulk/*": {
                target: "http://home.aixuexi.com",
                ws: true,
                changeOrigin: true
            },
            "/terminator/*" : {
                target: "https://bsk.aixuexi.com",
                ws: true,
                changeOrigin: true
            },
            "/ssk/*": {
                target: "https://bsk.aixuexi.com",
                ws: true,
                changeOrigin: true
            }
        }
    }
}