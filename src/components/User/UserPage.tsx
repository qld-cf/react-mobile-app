import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { List, InputItem, WhiteSpace, Toast } from 'antd-mobile'
import { getUserInfo } from '@redux/user.redux'
import { RouteComponentProps } from 'react-router-dom'

interface IActions{
  getUserInfo: any;
}

interface IProps {
  actions: IActions;
  form: any;
}

interface IState {
  identity: string;
}

class MallCart extends Component<IProps & RouteComponentProps> {
  readonly state: IState = {
    identity: ''
  }
  handleClick = async () => {
    const { identity } = this.state
    const { history, match } = this.props
    const { getUserInfo } = this.props.actions
    if (identity) {
      const res = await getUserInfo(identity)
      console.log(res)
      if (res) {
        Toast.info('获取成功', 1, null, false)
        this.setState({ identity: '' })
        history.push({
          pathname: `home`
        })
      }
    }
  }
  handleChange (e: any) {
    const { identity } = this.state
    this.setState({ identity: e })
  }
  render () {
    const { identity } = this.state
    const NewsComponent = (
      <div className=''>
        <List renderHeader={() => '输入你的身份'}>
          <InputItem
            clear
            placeholder='enter guest'
            value={identity}
            onChange={((e: any) => this.handleChange(e))}
          >Identity</InputItem>
          <List.Item>
            <div
              style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
              onClick={this.handleClick}
            >
              获取身份信息
            </div>
          </List.Item>
        </List>
      </div>
    )
    return (
      NewsComponent
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
    actions: bindActionCreators({ getUserInfo }, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MallCart)
