import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Style from './App.module.css';
import Auth from './components/Auth';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <div className={Style.root}>
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

export default App;
