
const urlParams: {
  [key: string]: string;
} = {}
window.location.search.substring(1).split(/&/).map((p) => p.split('=')).forEach((p) => { urlParams[p[0]] = p[1] })
// wechat alipay h5
const _SYS_CHANNEL = (function () {
  const ua = window.navigator.userAgent.toLowerCase()
  return ~ua.indexOf('micromessenger') ? 'wechat' : ~ua.indexOf('alipayclient') ? 'alipay' : 'h5'
})()
const BRANDID = urlParams['brandId']
export default class Config {
  /** 开发环境 */
  static readonly ENV = 'dev'
  /** 当前环境 */
  static readonly SYS_CHANNEL = _SYS_CHANNEL
  /** 百度地图AK密钥 */
  static readonly BAIDU_MAP_AK = '84oWCrEPVUDk1Ge6RaGzRzb57wki7MwY'

  /** 默认的测试数据 */
  static readonly TEST_USER = {
    memberId: '3356545', // 3061942
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuZElkIjoiMTAwMDE5Iiwic3RvcmVJZCI6IjMzMDAxOSIsImlhdCI6MTU2MTU0MTEwMSwiZXhwIjoyNDI1NTQxMTAxfQ.NXL3gWPwrwXnkB8KrRL5xxQ7TFGcBeJtTxTeTiLUgzd76d8RauHbk2-anti4QIZUzYEE82ZasMFz3ac9jbL7V3K5NM-ufs8kOgLU4IJn1VXkSGP0MGJDdyr-dUkSM3ytfC60Hc0f5TiKaFWphTTP-FI0lnKXOPv13W-0Rom0_8g'
  }
}
