import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

interface IActions{
}
interface IProps {
}
class MallCart extends Component<IProps> {
  render () {
    const NewsComponent = (
      <div className=''>
         NEWS
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
    actions: bindActionCreators({}, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MallCart)
