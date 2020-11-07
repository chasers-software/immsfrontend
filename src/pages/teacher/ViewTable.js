import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import './DataTable.css';

export class DataTableView extends Component {
    constructor(){
        super();
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        this.fetchProductData('data');
    }

    fetchProductData(productStateKey) {
        this.setState({ data: [{"RollNo":"001", "Name":"Ashique Barma", "Assessment":10, "Practical":45},
                                {"RollNo":"001", "Name":"Ashique Barma", "Assessment":10, "Practical":45},
                                {"RollNo":"001", "Name":"Ashique Barma", "Assessment":10, "Practical":45}]})
    }

    render() {
        return (
            <div className="datatable-editing">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <h3>Marks Summary View : Assessment and Practical Marks are NOT Editable</h3>
                    <DataTable value={this.state.data} header="Data">
                        <Column field="RollNo" header="RollNo"></Column>
                        <Column field="Name" header="Name"></Column>
                        <Column field="Assessment" header="Assessment"></Column>
                        <Column field="Practical" header="Practical"></Column>
                    </DataTable>
                </div>
            </div>
        );
    }
}
