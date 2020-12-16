import React from 'react';
import "./admindash.css";
import { InputText } from 'primereact/inputtext';

import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';

export class AdminDashboard extends React.Component {

constructor(props){
    super(props);
    this.state = {
            globalFilter: null,
             selectedCity1: null,
           
    };  
    this.cities = [
    {label: 'I', value: 'NY'},
    {label: 'II', value: 'RM'},
    {label: 'III', value: 'LDN'},
    {label: 'IV', value: 'IST'},
    {label: 'V', value: 'PRS'},
    {label: 'VI', value: 'PRS'},
    {label: 'VII', value: 'PRS'},
    {label: 'VIII', value: 'PRS'},
    {label: 'IX', value: 'PRS'},
    {label: 'X', value: 'PRS'}
];  
this.onCityChange = this.onCityChange.bind(this);
}
 onCityChange(e) {
        this.setState({ selectedCity1: e.value });
    }
 /* 
 https://primefaces.org/primereact/showcase/#/datatable/filter further code. for filter.
 */

  render() {
    return (
        <div className=" p-fluid">
           <div className="p-mt-2 p-grid p-offset-3">               
                <div className="cardResult  p-mt-2   p-col-4">
                        <div className="p-row headerPAPER">
                       <h2>
                            Total Teachers
                           </h2>
                        </div>
                        <hr/>
                           <div className="numberBIG p-row">
                        50
                        </div>
                </div>             
                <div className="cardResult p-mt-2 p-offset-2  p-col-4">
                        <div className="p-row headerPAPER">
                        <h2>
                            Total Students
                            </h2>
                        </div>
                        <hr/>
                           <div className="numberBIG p-row">
                        2000
                        </div>
                    </div>
                </div>     
           <div className="p-fluid card">
               <div className="p-grid p-lg-12 p-mt-2 ">
                     <div className="p-col">
                         <h3>Unique Roll No</h3>
                            <div className="p-inputgroup">
                                <InputText label="Unique Roll No" placeholder="Search By Unique Roll No"/>
                                
                                
                            </div>
                        </div>
                        <div className="p-col">
                         <h3>Semester</h3>
                            <div className="p-inputgroup">
                                
                               <Dropdown value={this.state.selectedCity1} options={this.cities} onChange={this.onCityChange} optionLabel="name" placeholder="Select Sem" />
                              
                            </div>
                        </div>
                           <div className="p-col">
                               <h3>Search</h3>

                          <Button icon="pi pi-search" />
                        </div>

               </div>
                    

             {/*<div className="p-grid p-offset-4 p-mt-2 ">
                    <div className="cardResult ">
                             <h2>Result Found</h2>
                    <hr/>
                    <p>
                        Name: Anjil Bishowkarma
                    </p>
                    <p>
                        Roll No: 074BCT505
                    </p>
                    <p>
                        This is Blank
                    </p>
                <Button label="View"/>
                </div>
                </div>
    */}




                </div>
            </div>
        
    );
    }
}
export default AdminDashboard;