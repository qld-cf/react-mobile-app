
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
 (1) 在url后面跟上 ?isDebug=true、会开启vConsole

