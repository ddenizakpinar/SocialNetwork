import React, { useState } from 'react'
import { Switch, Route } from "react-router-dom"
import * as authActions from './store/actions/authActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import AuthView from './views/AuthView/AuthView'
import HomeView from './views/HomeView/HomeView'
import ProfileView from './views/ProfileView/ProfileView'
const App = props => {

  const [constructorHasRun, setConstructorHasRun] = useState(false);

  const constructor = () => {
    if (constructorHasRun) return;
    props.onTryAutoSignup();
    setConstructorHasRun(true);
  };
  constructor();
  
  return (
    <>
      {
        !props.auth.isAuthenticated ? <Redirect to={"/auth"}></Redirect> : null
      }
      {
        <Switch>
          {
            props.user.loading ? null :
              <Route exact path="/">
                <HomeView />
              </Route>
          }
          {
            props.user.loading ? null :
              <Route exact path="/:id" component={ProfileView} />

          }
          <Route exact path="/auth">
            <AuthView />
          </Route>
        </Switch>
      }
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
