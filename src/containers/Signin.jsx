import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import {signInSuccess, signInFail} from '../actions'
import request from 'request'
import {saveState} from '../localStorage'
import history from '../history'
import ROOT_URL from '../rootUrl'


const Signin = ({signInFormStatus, signInUser, dispatch}) => {
  let username, password;

  const displayError = signInFormStatus ? <div className="ui error message">{signInFormStatus.message}</div> : '' ;
  return (
    <div className="ui container">
      <h1>Sign in</h1>
        <p>Default account is <span className="ui basic label red">test / password</span></p>
      <form className="ui form error" onSubmit={e => {
          e.preventDefault();

          signInUser(username.value, password.value);
        }}>
        { displayError }
        <div class="fields">
        <div className="six wide field">
          <label>Username</label>
          <input type="text" name="name" placeholder="Username" ref={node => {username = node}}></input>
        </div>
        <div className="six wide field">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" ref={node => {password = node}}></input>
        </div>
        <button className="ui button" type="submit">Sign in</button>
        </div>
    </form>
    </div>
  )
}



const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (username, password) => {
      request.post(ROOT_URL+'/authenticate', {form: {name: username, password}}, (err, response, body) => {
        let payload = JSON.parse(body);
        if (payload.success) {
          saveState(payload.token);
          dispatch(signInSuccess(payload));
          history.push('/');
          console.log('auth success!');
          return payload;
        }
        dispatch(signInFail(payload));
        console.log(payload);
        return payload;
      });
    }
  }
}

const mapStateToProps = ({signInFormStatus}) => {
  return {
    signInFormStatus
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
