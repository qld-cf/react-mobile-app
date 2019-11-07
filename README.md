### 脚手架
---
1. 路由
2. ant-mobile
3. vconsole
4. axios
5. redux(待添加)
6. eslint webpack
6. 陆续添加..



### 目录结构
```
.
|————build ------------------- 构建目录
|————config ------------------- 配置目录
| |————webpack.config.js  --------------- webpack 4+ 配置
|————public  ------------------- 公共目录
|————scripts --------------- 运行目录
|————src ------------------- 路由目录
| |————api --------------- 数据请求层
| |————assets --------------- 静态文件
| |————common --------------- 共用库
| |————components --------------- 组件库
| |————env --------------- 环境文件
| |————redux --------------- redux配置
| |————utils --------------- 工具库
|————index.tsx --------------------- 入口文件
|————react-app-env.d.ts ------------- 环境等声明
|————.eslintrc.js ----------------- eslint配置
|————README.md  --------------- 项目描述文件
|————package-lock.json  ------- npm包版本锁定文件, 确保每个环境安装的版本一致
|————package.json ------------- npm包依赖配置
```


### 安装依赖
`$ npm i`
### 本地运行
`$ npm start`
### 打包
`$ npm run build`

### 1.Typescript的ESlint配置
参考地址：[Typescript配置](https://ts.xcatliu.com/engineering/lint)
###### eslint的配置参考项目中的.eslintrc.js文件
###### Vscode settings.json配置
```
   "eslint.validate": [
      ...
      {
        "language": "typescript",
        "autoFix": true
      },
      {
        "language": "typescriptreact",
        "autoFix": true
      },
      ...
  // 开启自动修复
  "eslint.autoFixOnSave": true,
```

### 2.手机浏览器debug
 (1) 在url后面跟上 ?isDebug=true、会开启vConsole，方便微信浏览器js debug
 (2) 打包到正式环境会自动关闭vConsole，详情请看webpack配置

### 3.有用的话请给颗star✨星星，谢谢
