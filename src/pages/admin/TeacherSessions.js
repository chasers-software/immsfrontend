import React, { Component, Fragment } from 'react';
// import { Button } from 'primereact/button';
// import { Dropdown } from 'primereact/dropdown';
// import { Card } from "primereact/card";
// import { Button } from "primereact/button";
import './TeacherSessions.css';

class TeacherSessions extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render (){
        return (
            <Fragment>
            <div class='additionContainer'>
                {/* <Dropdown value={{department: this.state.teacher.department}} options={this.cities} onChange={this.onCityChange} optionLabel="department" required placeholder="Select a Department"/>
                <Dropdown value={{department: this.state.teacher.department}} options={this.cities} onChange={this.onCityChange} optionLabel="department" required placeholder="Select a Department"/>
                <Dropdown value={{department: this.state.teacher.department}} options={this.cities} onChange={this.onCityChange} optionLabel="department" required placeholder="Select a Department"/> */}
            </div>
            {/* <Card key={index} title={data.subCode} subTitle={data.subName} style={{ width: "20em" }}
                                            className="p-shadow-8 p-mb-2 p-mr-3" footer={<Button style={{width: "100%"}} label="Remove"
                                            onClick={() => this.onCardSelectHandler(data)}/>}>
                                          <span style={{margin: "0 1em 0 0"}} className="p-tag p-badge-secondary p-tag-rounded">{data.batch}</span>
                                          <span className="p-tag p-badge-secondary p-tag-rounded">{data.group}</span>
                                          <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
                                        </Card> */}
            </Fragment>
        )
    }
}

export default TeacherSessions;
