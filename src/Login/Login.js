import React from 'react'
import "./Login.scss";
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import tulogo from "../images/tulogo.png";
import { Toast } from 'primereact/toast';
import 'primeflex/primeflex.css';

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
    if (this.props.error !== null) {
      this.toast.show({severity: 'info', summary: 'Login Failed!!', detail: this.props.error});
      this.props.setError(null);
    }
      return (<div> 
        <Toast style={{zIndex: 10000}} ref={(el) => this.toast = el} />
        <div className="customgrid">
    <div className="p-col bigText ">
      Internal Marks Management System
    </div>
    <div className="p-col">
      <div className="login-page">
          <div className="form">
              <img
            src={tulogo}
            width="60px" alt="TU Logo"/>
            <h2>IMMS x DBMS</h2>
            <form className="login-form">
              <input id="username" type="text" placeholder="username" />
              <input id="password" type="password" placeholder="password" />
              <button onClick={this.onSubmitHandler}>login</button>
            </form>
          </div>
        </div>
    </div>
    
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
      onSignIn: (username, password) => dispatch(actions.auth(username, password)),
      setError: (value) => dispatch(actions.authFail(value))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
