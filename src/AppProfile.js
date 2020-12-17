import React, { Component } from "react";
import { connect } from 'react-redux';
import classNames from "classnames";
import profile1 from "./../src/images/Profile-6.jpg";
import { Button} from "primereact/button";
import { Dialog } from 'primereact/dialog';



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
         <Dialog className="accounttextleft" header="Account Details" visible={this.state.displayPosition} position={this.state.position} style={{ width: '50vw' }} footer={this.renderFooter('displayPosition')} onHide={() => this.onHide('displayPosition')}>
             
      
              <div className="p-grid p-dir-col">
                <img src="https://i.imgur.com/IqICwKK.jpg" alt=""/>
                  <div className="p-col  p-dir-rev ">
                  Full Name: Anjil Bishowkarma
                    </div>
                
                  <div className="p-col">
                    Roll No: 074BCT505
                  </div>
                  
                </div>
    
          </Dialog>
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
