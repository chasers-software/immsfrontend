import React, { Component } from "react";

import PropTypes from "prop-types";
// import { Dialog } from 'primereact/dialog';
// import { Button } from 'primereact/button';
// import Panel from 'primereact/panel';
// import pcampuslogo from "./images/pcampus.jpg";
import "./AppTopbar.css";

export class AppTopbar extends Component {
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
        {/* <div className="layout-topbar-icons">
         
          <button className="p-link"  >
            
            <span className="layout-topbar-item-text">Inbox</span>
            <span className="layout-topbar-icon pi pi-fw pi-inbox" />
            <span className="p-badge p-badge-danger">5</span>
          </button>
        </div> */}
      </div>
    );
  }
}
