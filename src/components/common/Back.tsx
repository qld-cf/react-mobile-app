/**
 * 便捷返回上页 - 组件
 */
import React, { PureComponent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
interface IState {
  top: number | string;
}
const screenHeight = window.document.body.offsetHeight
class Back extends PureComponent<RouteComponentProps> {
  readonly state: IState = {
    top: '80%'
  }
  goBack = () => {
    const { location, history } = this.props
    const { pathname, search } = location
    if (pathname === '/user') { // 订单列表页返回到个人中心
      history.replace('/user')
    } else if (history.length === 1) {
      // 找不到上一个页面时默认回到首页
      history.push('/home')
    } else {
      history.goBack()
    }
  }
  private startY: number;
  private endY: number;
  onTouchStart = (e: any) => {
    this.startY = e.changedTouches[0].clientY
  }
  onTouchMove = (e: any) => {
    let touchY = e.changedTouches[0].clientY
    if (touchY <= 28) {
      touchY = 28
    } else if (touchY >= screenHeight - 70) {
      touchY = screenHeight - 70
    }
    this.setState({
      top: touchY
    })
  }
  render () {
    const { top } = this.state
    return (
      <div
        className='back-btn'
        onClick={this.goBack}
        onTouchMove={this.onTouchMove}
        style={{ top }}
      >
        <i
          className='iconfont icon-fenleix'
        />
      </div>
    )
  }
}

export default withRouter(Back)
