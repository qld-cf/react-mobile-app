/**
 * 首页
 */
import React, { Component } from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import HomePage from '@cps/Home/HomePage'

interface IProps{
  match: RouteComponentProps['match'];
}

class Cart extends Component<IProps> {
  render () {
    const { match } = this.props
    console.log('match: ', match.path)
    return (
      <Switch>
        <Route exact path={match.path} component={HomePage} />
      </Switch>
    )
  }
}

export default Cart
