import React, { Component } from "react";
import classNames from "classnames";

export class AppProfile extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.setState({ expanded: !this.state.expanded });
    event.preventDefault();
  }

  render() {
    return (
      <div className="layout-profile">
        <div>
          <img
            src="https://img.icons8.com/windows/32/000000/gender-neutral-user.png"
            alt=""
          />
        </div>
        <button className="p-link layout-profile-link" onClick={this.onClick}>
          <span className="username">Dr. Aman Shakya </span>
        </button>
        <ul
          className={classNames({
            "layout-profile-expanded": this.state.expanded
          })}
        >
          <li>
            <button className="p-link">
              <i className="pi pi-fw pi-user" />
              <span>Account</span>
            </button>
          </li>
          <li>
            <button className="p-link">
              <i className="pi pi-fw pi-inbox" />
              <span>Notifications</span>
              <span className="menuitem-badge">2</span>
            </button>
          </li>
          {/* <li>
            <button className="p-link">
              <i className="pi pi-fw pi-power-off" />
              <span>Logout</span>
            </button>
          </li> */}
        </ul>
      </div>
    );
  }
}
