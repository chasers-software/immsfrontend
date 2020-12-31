import React, { Component } from "react";

import PropTypes from "prop-types";
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
      </div>
    );
  }
}
