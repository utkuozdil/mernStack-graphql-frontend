import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { compose } from "redux";
import "./App.css";
import Backdrop from "./components/Backdrop/Backdrop";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";
import Layout from "./components/Layout/Layout";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import MobileNavigation from "./components/Navigation/MobileNavigation/MobileNavigation";
import Toolbar from "./components/Toolbar/Toolbar";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";
import FeedPage from "./pages/Feed/Feed";
import SinglePostPage from "./pages/Feed/SinglePost/SinglePost";
import * as action from "./redux/action/Auth";

const App = props => {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) return;

    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    props.onSetIsAuth(true);
    props.onSetToken(token);
    props.onSetUserId(userId);
    setAutoLogout(remainingMilliseconds);
  }, []);

  useEffect(() => {
    if (props.autoLogout > 0) setAutoLogout(props.autoLogout);
  }, [props.autoLogout]);

  const mobileNavHandler = isOpen => {
    setShowMobileNav(isOpen);
    setShowBackdrop(isOpen);
  };

  const backdropClickHandler = () => {
    setShowBackdrop(false);
    setShowMobileNav(false);
    setError(null);
  };

  const logoutHandler = () => {
    props.onLogout();
  };

  const loginHandler = (event, authData) => {
    event.preventDefault();
    props.onSetAuthLoading(true);
    props.onLogin(authData.email, authData.password);
  };

  const signupHandler = (event, signupForm) => {
    event.preventDefault();
    props.onSetAuthLoading(true);
    props.onSignup(
      signupForm.email.value,
      signupForm.name.value,
      signupForm.password.value,
      props.history
    );
  };

  const setAutoLogout = milliseconds => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const errorHandler = () => setError(null);

  let routes = (
    <Switch>
      <Route
        path="/"
        exact
        render={props => (
          <LoginPage
            {...props}
            onLogin={loginHandler}
            loading={props.authLoading}
          />
        )}
      />
      <Route
        path="/signup"
        exact
        render={props => (
          <SignupPage
            {...props}
            onSignup={signupHandler}
            loading={props.authLoading}
          />
        )}
      />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/" exact render={props => <FeedPage {...props} />} />
        <Route
          path="/:postId"
          render={props => <SinglePostPage {...props} />}
        />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Fragment>
      {showBackdrop && <Backdrop onClick={backdropClickHandler} />}
      <ErrorHandler error={error} onHandle={errorHandler} />
      <Layout
        header={
          <Toolbar>
            <MainNavigation
              onOpenMobileNav={mobileNavHandler.bind(this, true)}
              onLogout={logoutHandler}
              isAuth={props.isAuth}
            />
          </Toolbar>
        }
        mobileNav={
          <MobileNavigation
            open={showMobileNav}
            mobile
            onChooseItem={mobileNavHandler.bind(this, false)}
            onLogout={logoutHandler}
            isAuth={props.isAuth}
          />
        }
      />
      {routes}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    token: state.auth.token,
    authLoading: state.auth.authLoading,
    userId: state.auth.userId,
    autoLogout: state.auth.autoLogout
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(action.login(email, password)),
    onLogout: () => dispatch(action.logout()),
    onSignup: (email, name, password, history) =>
      dispatch(action.signup(email, name, password, history)),
    onSetIsAuth: isAuth => dispatch(action.setIsAuth(isAuth)),
    onSetToken: token => dispatch(action.setToken(token)),
    onSetUserId: userId => dispatch(action.setUserId(userId)),
    onSetAuthLoading: authLoading =>
      dispatch(action.setAuthLoading(authLoading))
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);
