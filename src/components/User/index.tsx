/**
 * 用户页
 */
import React, { Component } from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import UserPage from '@cps/User/UserPage'

interface IProps{
  match: RouteComponentProps['match'];
}

class Cart extends Component<IProps> {
  render () {
    const { match } = this.props
    return (
      <Switch>
        <Route exact path={match.path} component={UserPage} />
      </Switch>
    )
  }
}

export default Cart
