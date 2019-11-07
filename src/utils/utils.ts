import pageName from '@common/pageName'

export const devicePixelRatio = window.devicePixelRatio
/**
 * 设置页面的标题
 * @param {string} title - 页面的标题
 */
export function setPageName ({ name, pageKey = 'HOME' }: { name?: string; pageKey?: string } = {}) {
  document.title = name || pageName[pageKey]
}
/** 获取当前系统信息 */
export function getPlatform () {
  const ua = navigator.userAgent.toLowerCase()
  const sysPlatform = navigator.platform.toLowerCase()
  const isIpad = ua.includes('ipad')
  const isAndroid = ua.includes('android')
  const isIOS = ua.includes('iphone os')
  const isIphoneX = isIOS && (screen.height >= 812 && screen.width >= 375)
  // console.log('isIphoneX', isIphoneX, screen.height, screen.width, navigator.userAgent)
  const isWeixin = ua.includes('micromessenger')
  const isMiniProgram = isWeixin && ua.includes('miniprogram') || window.__wxjs_environment === 'miniprogram'
  const isWeixinBrower = isWeixin && window.__wxjs_environment === 'browser' && !isMiniProgram
  const isComputerBrower = sysPlatform.includes('win') || sysPlatform.includes('mac')
  return {
    isAndroid,
    isIOS,
    isPhone: isAndroid || isIOS,
    isIpad,
    isIphoneX,
    isWeixin, // 微信环境
    isMiniProgram, // 小程序环境
    isWeixinBrower, // 微信浏览器环境（android下无法判断）
    isComputerBrower // 电脑浏览器
  }
}
/**
 * 格式化时间
 *
 * @static
 * @param {Date} [date = new Date()] - 时间对象
 * @param {Date} [dateSeparator = '/'] - 日期分隔符
 * @param {String} [timeSeparator = ':'] - 时间分隔符
 * @param {String} [type = 'en'] - 中式时间/英式时间
 * @param {Boolean} [week = false] - 是否显示星期周几
 * @param {Boolean} [meridiem = false] - 是否显示上下午
 * @param {Number} [day = 0] - 当前天数的增减量
 * @param {Number} [hour = 0] - 当前小时的增减量
 * @param {Number} [minutes = 0] - 当前分钟的增减量
 * @param {Number} [second = 0] - 当前秒钟的增减量
 * @param {boolean} [showDate = true] - 是否显示日期
 * @param {boolean} [showTime = true] - 是否显示时分秒
 * @returns {String}
 * @memberof Utils
 */
interface IFormatTime{
  date?: number;
  dateSeparator?: string;
  timeSeparator?: string;
  type?: string;
  week?: boolean;
  meridiem?: boolean;
  day?: number;
  hour?: number;
  minutes?: number;
  second?: number;
  showDate?: boolean;
  showTime?: boolean;
}
export const formatTime = ({ date = Date.now(), dateSeparator = '/', timeSeparator = ':', type = 'en', week = false, meridiem = false, day = 0, hour = 0, minutes = 0, second = 0, showDate = true, showTime = true }: IFormatTime = {}) => {
  const newDate = new Date(date + (day * 24 * 3600 + hour * 3600 + minutes * 60 + second) * 1000)
  const [weekDayCn, weekDayEn] = [['日', '一', '二', '三', '四', '五', '六'], ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']]
  let [y, M, d, w, h, m, s]: any[] = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate(), newDate.getDay(), newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()]
  M < 10 && (M = '0' + M) // 月
  d < 10 && (d = '0' + d) // 日
  // h > 12 && (h = h - 12) // 小时
  h < 10 && (h = '0' + h)
  m < 10 && (m = '0' + m) // 分
  s < 10 && (s = '0' + s) // 秒
  return type === 'en'
    ? [showDate ? [y, M, d].join(dateSeparator) : '', week ? `${weekDayEn[w]}` : '', meridiem ? `${h < 12 ? 'am' : 'pm'}` : '', showTime ? [h, m, s].join(timeSeparator) : ''].filter(val => val !== '').join(' ')
    : showDate && type === 'cn' ? [y + '年' + M + '月' + d + '日', week ? `星期${weekDayCn[w]}` : '', meridiem ? `${h < 12 ? '上午' : '下午'}` : '', showTime ? [h, m, s].join(timeSeparator) : ''].filter(val => val !== '').join(' ')
      : [showDate ? [y, M, d].join(dateSeparator) : '', [h, m, s].join(timeSeparator)].join(' ')
}
/**
 * url添加参数
 * @param {string} url - 需要添加参数的url
 * @param {object} params - 添加的参数，参数是'key:value'形式
 * @param {boolean} [isEncode=false] - 传入的url是否被编码过
 * @param {boolean} [needEncode=false] - 返回的url是否需要编码
 */
export const addParams = ({ url = '', params = {}, isEncode = false, needEncode = false }: { url: string; params: any; isEncode?: boolean; needEncode?: boolean }) => {
  url = isEncode ? decodeURIComponent(url) : url
  if (url.indexOf('?') > -1) {
    let oldParams: any = {}
    url.split('?')[1].split('&').forEach(val => {
      let newVal = val.split('=')
      oldParams[newVal[0]] = newVal[1]
    })
    // 合并、去重参数
    params = { ...oldParams, ...params }
  }
  let [paramsStr, i] = ['', 1]
  for (let [key, val] of Object.entries(params)) {
    paramsStr += i > 1 ? `&${key}=${val}` : `${key}=${val}`
    i++
  }
  const newUrl = `${url.split('?')[0]}?${paramsStr}`
  return needEncode ? encodeURIComponent(newUrl) : newUrl
}
/**
 * url参数查询
 * @static
 * @param {String} url - url地址
 * @param {String} query - 查询参数
 */
export const getParams = ({ url = location.href, query }: { url?: string; query?: string } = {}) => {
  const paramStr = url.split('?')[1]
  const paramArr = paramStr && paramStr.split('&') || []
  const params: any = {}
  paramArr.forEach((param) => {
    const paramData = param.split('=')
    params[paramData[0]] = paramData[1]
  })
  return query ? params[query] : params
}

/**
 * 随机色
 *
 * @param {Number} opacity - 透明度
 * @param {String} opacityType - 透明度是否随机
 */
export const getColor = function ({ opacity = 1, randomOpa = false } = {}) {
  let randomColor = []
  for (let i = 0; i < 3; i++) {
    randomColor[i] = Math.floor(Math.random() * 256)
  }
  opacity = randomOpa ? Math.random() : 1
  return `rgba(${randomColor[0]},${randomColor[1]},${randomColor[2]},${opacity})`
}
/**
 * 返回顶部
 */
export const scrollTo = ({ selector = '.dashboard-content', toScrollTop = 0, animation = true, extra = -15, increment = 20 }: { selector?: any; toScrollTop?: number; animation?: boolean; extra?: number; increment?: number} = {}) => {
  const ele = document.querySelector(selector)
  if (!ele) return
  // 元素初始滚动距离
  let startScrollTop = ele.scrollTop
  if (animation) {
    toScrollTop += extra
    increment = startScrollTop > toScrollTop ? -increment : increment
    let timer = setInterval(() => {
      startScrollTop += increment
      if (increment < 0) {
        startScrollTop >= toScrollTop && (ele.scrollTop = startScrollTop)
        if (startScrollTop < toScrollTop) {
          clearInterval(timer)
          timer = null
        }
      } else {
        startScrollTop <= toScrollTop && (ele.scrollTop = startScrollTop)
        if (startScrollTop > toScrollTop) {
          clearInterval(timer)
          timer = null
        }
      }
    }, 0)
  } else {
    ele.scrollTop = toScrollTop
  }
}
/**
 * 滚动到指定元素
 */
export const scrollToEle = ({ selector, offsetTop, extra = 0 }: { selector: any; offsetTop: number; extra?: number}) => {
  const ele = document.querySelector(selector)
  if (!ele) return
  let scrollTop = ele.scrollTop
  offsetTop = offsetTop - extra
  let timer = setInterval(() => {
    if (offsetTop > scrollTop) {
      scrollTop += 10
      scrollTop <= offsetTop && (ele.scrollTop = scrollTop)
      if (scrollTop > offsetTop) {
        clearInterval(timer)
        timer = null
      }
    } else {
      scrollTop -= 10
      scrollTop >= offsetTop && (ele.scrollTop = scrollTop)
      if (scrollTop < offsetTop) {
        clearInterval(timer)
        timer = null
      }
    }
  }, 0)
}
/**
 * 获得滚动距离
 */
export const getscrollTop = (selector: string = '.dashboard-content') => {
  const dashboardContent = document.querySelector(selector)
  if (!dashboardContent) return 0
  return dashboardContent.scrollTop
}
/**
 * 设置body是否可滚动
 */
export const preventBodyScroll = (unScroll: boolean) => {
  const htmlEle: any = document.getElementsByClassName('dashboard-content')[0]
  htmlEle.style.overflow = unScroll ? 'hidden' : 'auto'
}
/**
 *获取元素的兄弟元素
 */
export const getEleSiblings = (elm: any) => {
  const siblings = []
  const parentChildren = elm.parentNode.children
  for (let i = 0, pl = parentChildren.length; i < pl; i++) {
    if (parentChildren[i] !== elm) siblings.push(parentChildren[i])
  }
  return siblings
}
/**
 * 设置容器可滚动
 * @param {string} selector - 元素选择器
 */
export const overscroll = function (selector: string) {
  const ele = document.querySelectorAll(selector)
  ele.forEach((el: any) => {
    el && el.addEventListener('touchstart', function () {
      let top = el.scrollTop,
        totalScroll = el.scrollHeight,
        currentScroll = top + el.offsetHeight
      if (top === 0) {
        el.scrollTop = 1
      } else if (currentScroll === totalScroll) {
        el.scrollTop = top - 1
      }
    })
    el && el.addEventListener('touchmove', function (evt: any) {
      if (el.offsetHeight < el.scrollHeight) { evt._isScroller = true }
    })
  })
}
/**
 * 禁止元素touchmove事件
 */
export const preventEleTouch = (selector: any) => {
  const preventEle = document.querySelector(selector)
  preventEle && preventEle.addEventListener('touchmove', function (evt: any) {
    if (!evt._isScroller) {
      evt.preventDefault()
    }
  }, { passive: false })
}
/**
 * 复制文字
 * @param {any} ele - 元素
 */
export const copyText = (ele: any) => {
  const range = document.createRange()
  range.selectNode(ele)
  const selection = window.getSelection()
  selection.rangeCount > 0 && selection.removeAllRanges() // 清除之前的复制内容
  selection.addRange(range)
  document.execCommand('copy')
  selection.removeAllRanges() // 清除选中状态
}
