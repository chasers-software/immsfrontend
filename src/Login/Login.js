import React from 'react'
import "./Login.scss";
import tulogo from "../images/tulogo.png";

export class Login extends React.Component{
    render() {
        return (
          <div class="login-page">
            <div class="form">
                <img
              src={tulogo}
              width="60px" alt="TU Logo"/>
              <h2>IMMS x DBMS</h2>
              <form class="register-form">
                <input type="text" placeholder="name" />
                <input type="password" placeholder="password" />
                <input type="text" placeholder="email address" />
                <button>create</button>
              </form>
              <form class="login-form">
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                <button>login</button>
              </form>
            </div>
          </div>
        );
    }
}