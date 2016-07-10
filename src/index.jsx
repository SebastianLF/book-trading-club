import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider }  from 'react-redux'
import { Router, Route, Link, IndexRoute } from 'react-router'
import hashHistory from './history'
import todoApp from './reducers'
import { signOut } from './actions'
import { loadState, saveState } from './localStorage'
import Signin from './containers/Signin'
import Home from './components/Home'

import App from './containers/AppContainer'


const store = createStore(todoApp, {},
  // to enable Redux dev tools on browser.
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="signin" component={Signin}></Route>
        <Route path="allbooks" component={() => {return (<h1>All books</h1>)}}></Route>
        <Route path="logout" component={() => {store.dispatch(signOut());return (<h1>Logout</h1>)}}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
