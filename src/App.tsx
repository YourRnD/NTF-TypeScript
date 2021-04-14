import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Style from './App.module.css';
import Auth from './components/Auth';
import ErrorMessage from './components/common/ErrorMessage';
import Preloader from './components/common/Preloader';
import SuccessMessage from './components/common/SuccessMessage';
import EditBusiness from './components/EditBusiness';
import Home from './components/Home';
import { checkAuthTh, setInitAction } from './redux/actions/authAction';
import { RootState } from './redux/reducers';

type MapStatePropsType = {
  isLoaded: boolean;
  isAuth: boolean;
  isInit: boolean;
};

type MapDispatchPropsType = {
  checkAuth: () => void;
  setInit: (init: boolean) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const App: React.FC<PropsType> = ({
  isLoaded,
  isAuth,
  isInit,
  checkAuth,
  setInit,
}) => {
  useEffect(() => {
    if (!isInit) {
      if (localStorage.getItem('star_it_access_token')) {
        checkAuth();
      } else {
        setInit(true);
      }
    }
  }, [isInit, checkAuth, setInit]);

  if (isInit) {
    return (
      <div className={Style.root}>
        <Preloader isLoader={isLoaded || !isInit} />
        <ErrorMessage />
        <SuccessMessage />
        <BrowserRouter>
          {isAuth ? (
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/edit-business" component={EditBusiness} />
              <Redirect to="/home" />
            </Switch>
          ) : (
            <Switch>
              <Route
                exact
                path="/signin"
                render={() => <Auth typeOperation="Auth" />}
              />
              <Route
                exact
                path="/signup"
                render={() => <Auth typeOperation="Regist" />}
              />
              <Redirect to="/signin" />
            </Switch>
          )}
        </BrowserRouter>
      </div>
    );
  }

  return <Preloader isLoader={isLoaded || !isInit} />;
};

const mapToStateProps = (state: RootState): MapStatePropsType => ({
  isLoaded: state.common.isLoaded,
  isAuth: state.auth.isAuth,
  isInit: state.auth.isInit,
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>(
  mapToStateProps,
  {
    checkAuth: checkAuthTh,
    setInit: setInitAction,
  }
)(App);
