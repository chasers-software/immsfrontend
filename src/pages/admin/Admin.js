
import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';

class FormLayout extends Component {
    render(){
        return (
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname6">Firstname</label>
                    <InputText id="firstname6" type="text" />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="lastname6">Lastname</label>
                    <InputText id="lastname6" type="text" />
                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="address">Address</label>
                    <InputTextarea id="address" type="text" rows="4" />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="city">City</label>
                    <InputText id="city" type="text" />
                </div>
                {/* <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="state">State</label>
                    <Dropdown inputId="state" value={this.state.selectedState} options={this.states} onChange={this.onStateChange} placeholder="Select" optionLabel="name"/>
                </div> */}
                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="zip">Zip</label>
                    <InputText id="zip" type="text" />
                </div>
            </div>
        )
    }
}

export default FormLayout;
