import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import ENV from '@env'
import Config from '@common/config'
import rootReducer from '@redux/rootReducer'
import Dashboard from '@cps/dashBoard/Dashboard'
import { ScrollToTop } from '@common-cps'
import '@css/index.scss'

// 全局接口
window.ENV = ENV
// 全局配置
window.Config = Config

const isDebug = location.href.includes('isDebug=true')
// vConsole插件的使用，动态引入
if (ENV.env === 'dev' || isDebug) {
  const ua = navigator.platform.toLowerCase()
  const VConsole = require('vconsole');
  (!ua.includes('win') && !ua.includes('mac') || isDebug) && new VConsole()
}
// 全局window属性
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function;
    ENV: any;
    Config: any;
    __wxjs_environment: any;
    WeixinJSBridge: any;
    wx: any;
  }
}
// redux store配置
const store = process.env.NODE_ENV === 'production' ? (
  createStore(rootReducer, applyMiddleware(thunk))
) : (
  window.__REDUX_DEVTOOLS_EXTENSION__ ? (
    createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()))
  ) : (
    createStore(rootReducer, applyMiddleware(thunk))
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <Switch>
        <Route component={Dashboard} />
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
)
serviceWorker.unregister()
