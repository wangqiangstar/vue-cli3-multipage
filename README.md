# business

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start || npm run start || npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
### 目录结构
```
- dist                                                  打包后的资源
- public                                                共有资源
-src                                                    前端资源
    - assets                                                 前端静态资源目录
    - common                                                 公共方法目录
    - components                                             公共组建目录
    - pages                                                  页面目录
        - index                                                     子页面目录
            - components                                            当前子页面组建目录
            - router                                                当前子页面路由目录
            - view                                                  当前子页面的页面目录
                - index.vue                                             页面
                - ceshi.vue                                             页面
            -index.html                                             当前子页面html模板
            - index.js                                              当前子页面入口文件
            - index.vue                                             当前子页面vue配置文件
    - store                                                  状态管理store目录
-util                                                    构建需要方法

```

### 新建页面方式
1. 直接copy项目下pages、demo文件夹
2. 重命名为自己的页面
3. pc和mobile下不要有重复名字，是在无法区分情况用*_mb表示mobile下的页面
4. pc下自动转换rem基准尺寸1920、mobile下自动转换rem基准尺寸750


### ajax請求方式
1. 使用`this.$service.xx.xx()`

### todoList
1. 添加配置文件可在开发阶段指定具体页面进行打包，避免开发阶段打包时间过长问题
2. 指定具体页面要使用rem转换、开关控制是否启动rem自定转换
3. 一些优化的loader、plugin增加