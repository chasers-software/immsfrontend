import React, { Component } from "react";
import { connect } from 'react-redux';
import classNames from "classnames";
import profile1 from "./../src/images/Profile-6.jpg";
import { Button} from "primereact/button";
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import * as uris from './store/uris';

class AppProfile extends Component {
   constructor(props) {
        super(props);
        this.state = {
            displayPosition: false,
            position: "top-left",
            expanded: true,
            currPass: '',
            newPass: '',
            confirmPass: ''
        };

        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.changePass = this.changePass.bind(this);
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

    hideDialog() {
      this.setState({
        displayPosition: false
      });
    }

    changePass() {
      if(this.state.currPass === '') this.toast.show({severity: 'info', summary: 'Cannot Proceed', detail: 'Must enter the old Password'});
      else if(this.state.newPass === '' || this.state.confirmPass === '') this.toast.show({severity: 'info', summary: 'Cannot Proceed', detail: 'Must enter both new and Retype password'});
      else if(this.state.newPass !== this.state.confirmPass)  this.toast.show({severity: 'info', summary: 'Cannot Proceed', detail: "New Password and Retype Password doesn't match"});
      else {
        fetch(uris.CHANGE_PASSWORD  , {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({person_id: this.props.username,
                                old_password: this.state.currPass,
                                new_password: this.state.newPass})
        })
      .then(res => res.json())
      .then(res => {
          if (res.status === 'success') {
            this.toast.show({severity: 'success', summary: 'Password Successfully Updated', detail: res.message});
            this.setState({ currPass: '', newPass: '', confirmPass: ''})
          } else {
            this.toast.show({severity: 'error', summary: 'Password Change Failed', detail: res.message});
          }
          this.setState({displayPosition: false})
      })
      .catch(err => console.log(err))
      }
    }

  render() {
    const renderFooter = (
      <React.Fragment>
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
          <Button label="Confirm" icon="pi pi-check" className="p-button-text" onClick={this.changePass} />
      </React.Fragment>
  );
    return (
      <React.Fragment>        
        <Toast position="bottom-right" style={{zIndex: 10000}} ref={(el) => this.toast = el} />
      <div className="layout-profile">
        <div>
          <img
            src={profile1}
            width="100px"
            alt=""
          />
        </div>
        <button className="p-link layout-profile-link" onClick={this.onClick}>
          <span className="username">{this.props.full_name}</span>
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
        <Dialog className="accounttextleft" header="Change Password" visible={this.state.displayPosition} position={this.state.position} style={{ width: '300px' }} footer={renderFooter} onHide={() => this.onHide('displayPosition')}>
             <div className="p-grid  p-dir-col">
                <div style={{margin: '5px'}}><InputText value={this.state.currPass} onChange={(e) => this.setState({currPass: e.target.value})} placeholder="Input Current Password" /></div>
                <div style={{margin: '5px'}}><InputText value={this.state.newPass} onChange={(e) => this.setState({newPass: e.target.value})} placeholder="Input New Password" /></div>
                <div style={{margin: '5px'}}><InputText value={this.state.confirmPass} onChange={(e) => this.setState({confirmPass: e.target.value})} placeholder="Retype New Password" /></div>                  
              </div>
          </Dialog>
          </div>
          </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
      full_name: state.auth.full_name,
      username: state.auth.username,
  };
};

export default connect( mapStateToProps, null )(AppProfile);
