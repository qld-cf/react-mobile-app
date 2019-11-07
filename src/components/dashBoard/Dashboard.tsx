/**
 * 首页Dashboard
 */
import React, { Component, Suspense } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import NavLinkBar from '@cps/dashBoard/NavlinkBar'
import { Back } from '@common-cps'
const Home = React.lazy(() => import('@cps/Home'))
const News = React.lazy(() => import('@cps/News'))
const User = React.lazy(() => import('@cps/User'))

interface IProps {
}
class Dashboard extends Component<IProps & RouteComponentProps> {
  constructor (props: IProps & RouteComponentProps) {
    super(props)
    // 监听页面的跳转
  }
  private navList = [
    {
      path: '/home',
      text: '首页',
      icon: 'shouye',
      title: '首页',
      component: Home,
      isCache: true
    },
    {
      path: '/news',
      text: '新闻',
      icon: 'gouwuche',
      title: '购物车',
      component: News,
      isCache: false
    },
    {
      path: '/user',
      text: '我的',
      icon: 'gerenzhongxin',
      title: '个人中心',
      component: User,
      isCache: true
    }
  ]

  componentDidMount () {
  }

  componentDidUpdate () {
  }

  render () {
    const { match, location } = this.props
    const { pathname } = location
    const isTab = this.navList.find((nav) => {
      return match.path === '/' && pathname === '/' || pathname === nav.path
    })
    // 无返回按钮的页面路径
    const noBackMap = ['/result']
    const isNoBack = noBackMap.some((item) => {
      return pathname.includes(item)
    })
    // 是否在调试模式
    return (
      <div className='dashboard scroll'
        // onScroll={this.onScroll}
      >
        <Suspense fallback={null}>
          <CacheSwitch>
            {this.navList.map(nav => {
              return (
                nav.isCache ? (
                  <CacheRoute
                    className='dashboard-content scroll'
                    key={nav.path}
                    path={nav.path}
                    render={(props: any) => (
                      <nav.component {...props} />
                    )}
                  ></CacheRoute>
                ) : (
                  <Route
                    className='dashboard-content scroll'
                    key={nav.path}
                    path={nav.path}
                    render={(props: any) => (
                      <nav.component {...props} />
                    )}
                  ></Route>
                )
              )
            }
            )}
          </CacheSwitch>
        </Suspense>
        {/* 底部tab */}
        {
          isTab && <NavLinkBar navList={this.navList}></NavLinkBar>
        }
        {/* 返回按钮 */}
        {
          !isTab && !isNoBack && <Back />
        }
      </div>
    )
  }
}

// connect
const mapStateToProps = (state: any) => {
  return {
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators({}, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
