import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './scss/App.scss';

import axios from 'axios';

// axios에 붙이는 서버(뭔가 이상하게 느껴짐. 이방법 외엔 없는 것일까..)
axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production'
    ? 'https://localhost:5000'
    : 'https://ec2-13-124-75-190.ap-northeast-2.compute.amazonaws.com:5000';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
