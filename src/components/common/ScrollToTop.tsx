/**
 * 除开当前页，页面内容都默认回到顶部 - 组件
 */
import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
class ScrollToTop extends Component<RouteComponentProps> {
  componentDidUpdate (prevProps: RouteComponentProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
      document.querySelector('.dashboard-content') && (document.querySelector('.dashboard-content').scrollTo(0, 0))
    }
  }
  render (): any {
    return null
  }
}

export default withRouter(ScrollToTop)
