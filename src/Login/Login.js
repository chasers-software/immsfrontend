import React from 'react'
import "./Login.scss";
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import tulogo from "../images/tulogo.png";

class Login extends React.Component{
  constructor (props){
        super();
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  
  onSubmitHandler(event){
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    this.props.onSignIn(username, password);
  }
  render() {
      return (
        <div className="login-page">
          <div className="form">
              <img
            src={tulogo}
            width="60px" alt="TU Logo"/>
            <h2>IMMS x DBMS</h2>
            {/* <form class="register-form">
              <input type="text" placeholder="name" />
              <input type="password" placeholder="password" />
              <input type="text" placeholder="email address" />
              <button>create</button>
            </form> */}
            <form className="login-form">
              <input id="username" type="text" placeholder="username" />
              <input id="password" type="password" placeholder="password" />
              <button onClick={this.onSubmitHandler}>login</button>
            </form>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      authRedirectPath: state.auth.authRedirectPath
  }
};

const mapDispatchToProps = dispatch => {
  return {
      onSignIn: (username, password) => dispatch(actions.auth(username, password))
  }
};

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
