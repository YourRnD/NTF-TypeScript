import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import Style from './App.module.css';
import Auth from './components/Auth';
import ErrorMessage from './components/common/ErrorMessage';
import Preloader from './components/common/Preloader';
import Home from './components/Home';
import { RootState } from './redux/reducers';

type MapStatePropsType = {
  isLoaded: boolean;
};

type MapDispatchPropsType = {};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const App: React.FC<PropsType> = ({ isLoaded }) => {
  return (
    <div className={Style.root}>
      <Preloader isLoader={isLoaded} />
      <ErrorMessage />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/auth"
            render={() => <Auth typeOperation="Regist" />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const mapToStateProps = (state: RootState): MapStatePropsType => ({
  isLoaded: state.common.isLoaded,
});

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>(
    mapToStateProps,
    {}
  )
)(App);
