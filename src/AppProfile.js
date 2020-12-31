import React, { Component } from "react";
import { connect } from 'react-redux';
import classNames from "classnames";
import profile1 from "./../src/images/Profile-6.jpg";
import { Button} from "primereact/button";

class AppProfile extends Component {
   constructor(props) {
        super(props);
        this.state = {
            displayBasic: false,
            displayBasic2: false,
            displayModal: false,
            displayConfirmation: false,
            displayMaximizable: false,
            displayPosition: false,
            displayPosition2: false,
            visibleRight: false,
            position: "top-left",
            expanded: true
        };

        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }

 onClick(name, position) {
        let state = {
            [`${name}`]: true
        };

        if (position) {
            state = {
                ...state,
                position
            }
        }

        this.setState(state);
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }

    renderFooter(name) {
        return (
            <div>
                <Button label="Close" icon="pi pi-check" onClick={() => this.onHide(name)} autoFocus />
            </div>
        );
    }


  render() {
    return (
      <div className="layout-profile">
        <div>
          <img
            src={profile1}
            width="100px"
            alt=""
          />
        </div>
        <button className="p-link layout-profile-link" onClick={this.onClick}>
          <span className="username">{this.props.username}</span>
        </button>
        <ul
          className={classNames({
            "layout-profile-expanded": this.state.expanded
          })}
        >
          <li>
            <button className="p-link" onClick={() => this.onClick('displayPosition', 'left')} >
              <i className="pi pi-fw pi-user" />
              <span>Account</span>
            </button>
          </li>
        </ul>
          </div>
         
          
    );
  }
}

const mapStateToProps = state => {
  return {
      username: state.auth.fullname,
  };
};

export default connect( mapStateToProps, null )(AppProfile);
