/**
 * 新闻页
 */
import React, { Component } from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import NewsPage from '@cps/News/NewsPage'

interface IProps{
  match: RouteComponentProps['match'];
}

class Cart extends Component<IProps> {
  render () {
    const { match } = this.props
    return (
      <Switch>
        <Route exact path={match.path} component={NewsPage} />
      </Switch>
    )
  }
}

export default Cart
