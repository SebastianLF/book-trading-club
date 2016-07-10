import React, { PropTypes } from 'react'
import App from '../components/app'
import {connect} from 'react-redux'
import {loadState} from '../localStorage'
import request from 'request'
import ROOT_URL from '../rootUrl'

const mapStateToProps = (state) => {
  console.log(state.user);
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loggedIn: () => {
      let token = loadState();
      if (!token || token === '') {
        return;
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
