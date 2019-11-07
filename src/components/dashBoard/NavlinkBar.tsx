/**
 * 底部Bar
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { TabBar } from 'antd-mobile'
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom'

interface INavList{
  path: string;
  text: string;
  icon: string;
  title: string;
  component: any;
}
interface IActions{
}
interface IProps {
  actions: IActions;
  location: RouteComponentProps['location'];
  history: RouteComponentProps['history'];
  navList: INavList[];
}

class NavLinkBar extends Component<RouteComponentProps & IProps> {
  private timer: any;
  handleOnPress = (path: string, title: string) => {
    const { history } = this.props
    history.push(path)
  }
  componentDidUpdate (prevProps: IProps) {
  }
  componentWillUnmount () {
  }
  render () {
    const { navList, location } = this.props
    const { pathname } = location
    const NavLinkBarComponent = (
      <div className='bottom-navlink-bar'>
        <TabBar
          tabBarPosition='bottom'
          prerenderingSiblingsNumber={Infinity}
        >
          {navList.map(nav => (
            <TabBar.Item
              key={nav.path}
              icon={
                <i className={`iconfont icon-${nav.icon} nav-tab`} />
              }
              selectedIcon={
                <i className={`iconfont icon-${nav.icon} nav-tab`} />
              }
              selected={pathname === nav.path}
              onPress={() => this.handleOnPress(nav.path, nav.title)}
            >
            </TabBar.Item>
          ))}
        </TabBar>
      </div>
    )
    const defaultComponent = <Redirect to='/home' />
    return pathname === '/' ? defaultComponent : NavLinkBarComponent
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
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavLinkBar))
