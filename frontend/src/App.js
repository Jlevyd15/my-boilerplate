import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PageLayout from './pages/PageLayout'
import { config } from './project.config.js'
import { isAuthenticated } from './utils/auth'

class App extends Component {
  render() {
    const  { home, login, register, users } = config.routes
    return (
      <BrowserRouter>
        <Switch>
          <PageLayout>
            {/*<Route exact path="/" component={LANDING PAGE COMPONENT HERE} />
            
            <MatchWhenAuthorized path="/dashboard" name="Home" component={Full}/>*/}
            <Route exact path={home.route} component={home.component} />
            <Route exact path={login.route} component={login.component} />
            <Route exact path={register.route} component={register.component} />
            {/*<MatchWhenAuthorized path="/days" component={DayForm} />*/}
            <MatchWhenAuthorized path={users.route} component={users.component} />
          </PageLayout>
        </Switch>
      </BrowserRouter>
    );
  }
}

const MatchWhenAuthorized = ({component: Component, ...rest}) => (
  <Route {...rest} render={renderProps => (
    isAuthenticated() ? (
      <Component {...renderProps} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: {from: renderProps.location}
      }} />
    )
  )}/>
)

export default App;
