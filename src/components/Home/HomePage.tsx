import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
// interface
interface IActions{
}
interface IProps {
  user: any;
}
class MallCart extends Component<IProps> {
  render () {
    const { info } = this.props.user
    const HomeComponent = (
      <div className=''>
        {info.name && <div>Welcome, {info.name}</div>}
        {!info.name && <div>Home</div>}
      </div>
    )
    return (
      HomeComponent
    )
  }
}

// connect
const mapStateToProps = (state: any) => {
  return {
    user: state.user
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
)(MallCart)
