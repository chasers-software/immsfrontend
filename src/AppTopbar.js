import React, { Component } from "react";

import PropTypes from "prop-types";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
// import Panel from 'primereact/panel';
// import pcampuslogo from "./images/pcampus.jpg";
import "./AppTopbar.css";

export class AppTopbar extends Component {
   constructor(props) {
        super(props);
        this.state = {
            displayBasic: false,
            displayBasic2: false,
            displayModal: false,
            displayConfirmation: false,
            displayMaximizable: false,
            displayPosition: false,
            position: 'top-right'
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
                <Button label="Edit" icon="pi pi-times" onClick={() => this.onHide(name)} className="p-button-text" />
                <Button label="Close" icon="pi pi-check" onClick={() => this.onHide(name)} autoFocus />
            </div>
        );
    }

  static defaultProps = {
    onToggleMenu: null
  };

  static propTypes = {
    onToggleMenu: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="layout-topbar clearfix">
        <button
          className="p-link layout-menu-button"
          onClick={this.props.onToggleMenu}
        >
          <span className="menubar" />
        </button>
        <div className="pcampus">

        </div>
        <div className="layout-heading">
          <p>
            Internal Marks Management System
            </p>
        </div>
        <div className="layout-topbar-icons">
         
          <button className="p-link" onClick={() => this.onClick('displayBasic', 'top-right')} >
            
            <span className="layout-topbar-item-text">Inbox</span>
            <span className="layout-topbar-icon pi pi-fw pi-inbox" />
            <span className="p-badge p-badge-danger">5</span>
          </button>

          <Dialog className="elevate" header="Inbox" position={this.state.position} visible={this.state.displayBasic} style={{ width: '48vw', height: '100%' }}  onHide={() => this.onHide('displayBasic')}>
          <div className="p-grid styleinbox p-dir-col">
	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/IqICwKK.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
 Aman Shakya Updated DBMS Assessment Mark.
    </div>
  <div className="timeago"> 3min Ago</div>
  </div>

	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/hLwNrtw.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
 Arun Kumar Timalsina Updated OOAD Assessment Mark.
    </div>
  <div className="timeago"> 5min Ago</div>
  </div>

  	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/qf85HcV.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
 Surendra Shrestha Updated ES Assessment Mark.
    </div>
  <div className="timeago"> {Date.now()}</div>
  </div>


  	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/G2QX0gC.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
 Basanta Joshi Updated AI Assessment Mark.
    </div>
  <div className="timeago"> 3min Ago</div>
  </div>


  	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/qf85HcV.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
 Roshan Karki Updated E.Com Assessment Mark.
    </div>
  <div className="timeago"> 3min Ago</div>
  </div>


  	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/G2QX0gC.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
Bikash Shrestha Updated DBMS Assessment Mark.
    </div>
  <div className="timeago"> 3min Ago</div>
  </div>


  	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/IqICwKK.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
 Bijay Shrestha Updated DBMS Assessment Mark.
    </div>
  <div className="timeago"> 3min Ago</div>
  </div>

  	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/hLwNrtw.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
 Devi Bhatarrai Updated DBMS Assessment Mark.
    </div>
  <div className="timeago"> 3min Ago</div>
  </div>


  	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/G2QX0gC.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
Bikash Shrestha Updated DBMS Assessment Mark.
    </div>
  <div className="timeago"> 3min Ago</div>
  </div>


  	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/IqICwKK.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
 Bijay Shrestha Updated DBMS Assessment Mark.
    </div>
  <div className="timeago"> 3min Ago</div>
  </div>

  	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/hLwNrtw.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
 Devi Bhatarrai Updated DBMS Assessment Mark.
    </div>
  <div className="timeago"> 3min Ago</div>
  </div>


    	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/G2QX0gC.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
Bikash Shrestha Updated DBMS Assessment Mark.
    </div>
  <div className="timeago"> 3min Ago</div>
  </div>


  	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/IqICwKK.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
 Bijay Shrestha Updated DBMS Assessment Mark.
    </div>
  <div className="timeago"> 3min Ago</div>
  </div>

  	<div className="p-col itstyle ">
  <img src="https://i.imgur.com/hLwNrtw.jpg" width="45px" height="45px" alt=""/>
  
  <div className="inboxtext">
 Devi Bhatarrai Updated DBMS Assessment Mark.
    </div>
  <div className="timeago"> 3min Ago</div>
  </div>





</div>               
         
          </Dialog>
        </div>
      </div>
    );
  }
}
