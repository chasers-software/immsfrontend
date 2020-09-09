import React, { Component } from "react";
import { Panel } from "primereact/panel";
//import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
//import { Dropdown } from "primereact/dropdown";
//import { InputText } from "primereact/inputtext";
//import { Chart } from "primereact/chart";
//import { DataTable } from "primereact/datatable";
//import { Column } from "primereact/column";
//import { FullCalendar } from "primereact/fullcalendar";
//import dayGridPlugin from "@fullcalendar/daygrid";
//import interactionPlugin from "@fullcalendar/interaction";
//import timeGridPlugin from "@fullcalendar/timegrid";

export class Dashboard extends Component {
  render() {
    return (
      <div className="p-grid p-fluid dashboard">
        <div className="p-col-12 p-lg-4">
          <div className="card summary p-p-2 p-shadow-6">
            <span className="title">Admin</span>
            <span className="detail">No of Admin</span>
            <span className="count visitors">1</span>
          </div>
        </div>
        <div className="p-col-12 p-lg-4">
          <div className="card summary p-p-2 p-shadow-6">
            <span className="title">Teachers</span>
            <span className="detail">Number of Teachers</span>
            <span className="count purchases">40</span>
          </div>
        </div>
        <div className="p-col-12 p-lg-4">
          <div className="card summary p-p-2 p-shadow-6">
            <span className="title">Total Students</span>
            <span className="detail">Students in Pulchowk Campus</span>
            <span className="count revenue">1700</span>
          </div>
        </div>

        <div className="p-col-8 p-lg-12 p-p-2 p-ml-2 p-mt-4 p-shadow-8 p-mb-4 contacts">
          <Panel header="Contacts">
            <ul>
              <li>
                <button className="p-link">
                  <img
                    src="https://etarkeshwor.com/wp-content/uploads/2018/12/tu-logo-.jpg"
                    width="35"
                    alt="avatar1"
                  />
                  <span className="name">Bikash Shrestha</span>
                  <span className="email">bikash@shrestha.com</span>
                </button>
              </li>
              <li>
                <button className="p-link">
                  <img
                    src="https://etarkeshwor.com/wp-content/uploads/2018/12/tu-logo-.jpg"
                    width="35"
                    alt="avatar2"
                  />
                  <span className="name">Bijay Shrestha</span>
                  <span className="email">bijay@shrestha.com</span>
                </button>
              </li>
              <li>
                <button className="p-link">
                  <img
                    src="https://etarkeshwor.com/wp-content/uploads/2018/12/tu-logo-.jpg"
                    width="35"
                    alt="avatar3"
                  />
                  <span className="name">Devi Bhattarai</span>
                  <span className="email">devi@bhattarai.com</span>
                </button>
              </li>
              <li>
                <button className="p-link">
                  <img
                    src="https://etarkeshwor.com/wp-content/uploads/2018/12/tu-logo-.jpg"
                    width="35"
                    alt="avatar4"
                  />
                  <span className="name">Anjil Bishowkarma</span>
                  <span className="email">anjil@bishowkarma.com</span>
                </button>
              </li>
            </ul>
          </Panel>
        </div>

        <div className="p-col-8 p-lg-12 p-p-2 p-ml-2 p-mt-4 p-shadow-8 ">
          <Panel header="Activity" style={{ height: "100%" }}>
            <div className="activity-header">
              <div className="p-grid">
                <div className="p-col-6">
                  <span style={{ fontWeight: "bold" }}>Last Activity</span>
                  <p>Updated 1 minute ago</p>
                </div>
                <div className="p-col-6" style={{ textAlign: "right" }}>
                  <Button label="Refresh" icon="pi pi-refresh" />
                </div>
              </div>
            </div>

            <ul className="activity-list">
              <li>
                <div className="count">Marks Added</div>
                <div className="p-grid">
                  <div className="p-col-6">StudentName</div>
                  <div className="p-col-6">95%</div>
                </div>
              </li>
              <li>
                <div className="count" style={{ backgroundColor: "#f9c851" }}>
                  $250
                </div>
                <div className="p-grid">
                  <div className="p-col-6">Tax</div>
                  <div className="p-col-6">24%</div>
                </div>
              </li>
              <li>
                <div className="count" style={{ backgroundColor: "#20d077" }}>
                  $125
                </div>
                <div className="p-grid">
                  <div className="p-col-6">Invoices</div>
                  <div className="p-col-6">55%</div>
                </div>
              </li>
              <li>
                <div className="count" style={{ backgroundColor: "#f9c851" }}>
                  $250
                </div>
                <div className="p-grid">
                  <div className="p-col-6">Expenses</div>
                  <div className="p-col-6">15%</div>
                </div>
              </li>
              <li>
                <div className="count" style={{ backgroundColor: "#007be5" }}>
                  $350
                </div>
                <div className="p-grid">
                  <div className="p-col-6">Bonus</div>
                  <div className="p-col-6">5%</div>
                </div>
              </li>
              <li>
                <div className="count" style={{ backgroundColor: "#ef6262" }}>
                  $500
                </div>
                <div className="p-grid">
                  <div className="p-col-6">Revenue</div>
                  <div className="p-col-6">25%</div>
                </div>
              </li>
            </ul>
          </Panel>
        </div>
      </div>
    );
  }
}
