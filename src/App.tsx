import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Style from './App.module.css';
// import { lib } from './common/lib';
import Auth from './components/Auth';
import ErrorMessage from './components/common/ErrorMessage';
import Preloader from './components/common/Preloader';
import SuccessMessage from './components/common/SuccessMessage';
import EditBusiness from './components/EditBusiness';
import EditFeedback from './components/EditFeedback';
import EditPoint from './components/EditPoint';
import Header from './components/Header';
import Home from './components/Home';
import PointsTable from './components/PointsTable';
import { checkAuthTh, setInitAction } from './redux/actions/authAction';
import { RootState } from './redux/reducers';

type MapStatePropsType = {
  isLoaded: boolean;
  isAuth: boolean;
  isInit: boolean;
  typeOperation: 'Regist' | 'Login' | 'Hide';
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
  typeOperation,
}) => {
  useEffect(() => {
    if (!isInit) {
      if (localStorage.getItem('star_it_access_token')) {
        checkAuth();
        // lib();
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
          {!isAuth && typeOperation !== 'Hide' ? (
            <Auth typeOperation={typeOperation} />
          ) : null}
          {isAuth ? (
            <>
              <Header />
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/edit-business" component={EditBusiness} />
                <Route exact path="/table-points" component={PointsTable} />
                <Route path="/edit-points/:type?/:id?" component={EditPoint} />
                <Route
                  path="/edit-feedback/:type?/:id?"
                  component={EditFeedback}
                />
                <Redirect to="/home" />
              </Switch>
            </>
          ) : null}
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
  typeOperation: state.auth.typeOperation,
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>(
  mapToStateProps,
  {
    checkAuth: checkAuthTh,
    setInit: setInitAction,
  }
)(App);
