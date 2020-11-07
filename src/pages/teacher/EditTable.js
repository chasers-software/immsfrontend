import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/teacher';
// import { Button } from 'primereact/button';
import './DataTable.css';
import { isInt } from '@fullcalendar/core';

class DataTableEdit extends Component {

    constructor(props) {
        super();
        this.state = { data: [{"RollNo":"001", "Name":"Ashique Barma", "Assessment":10, "Practical":45},
                            {"RollNo":"001", "Name":"Ashique Barma", "Assessment":10, "Practical":45},
                            {"RollNo":"001", "Name":"Ashique Barma", "Assessment":10, "Practical":45}],
                        returnBack: false}
        this.toast = null;
    }

    componentDidMount(){
        this.props.setInfoBox({summary:"Info Message", detail: 'No Active Course Selected!!!'}); // TODO: set condition for returning
    }
    onEditorValueChange(stateItem, props, value) {
        let updatedProducts = [...props.value];
        let update = false;
        if (!isInt(parseInt(value))){
            updatedProducts[props.rowIndex][props.field] = 0;
            this.setState({ [`${stateItem}`]: updatedProducts });
            return
        }
        switch (props.field){
            case "Assessment": update = (parseInt(value) >=0 && parseInt(value) <= 20);
                break;
            case "Practical": update = (parseInt(value) >=0 && parseInt(value) <= 50);
                break;
            default: update = false;
        }
        if (update) {
            updatedProducts[props.rowIndex][props.field] = parseInt(value);
            this.setState({ [`${stateItem}`]: updatedProducts })
        }
    }

    inputTextEditor(stateItem, props, field) {
        return <InputText type="number" value={props.rowData[field]} onChange={(e) => this.onEditorValueChange(stateItem, props, e.target.value)} />;
    }

    AssessmentEditor(stateItem, props) {
        return this.inputTextEditor(stateItem, props, 'Assessment');
    }

    PracticalEditor(stateItem, props) {
        return this.inputTextEditor(stateItem, props, 'Practical');
    }

    render() {
        return (
            <div className="datatable-editing">
                <Toast ref={(el) => this.toast = el} />
                {this.props.infoBox ? <Redirect to='/'/> : null}
                <div className="card">
                    <h3>Marks Editing View : Assessment and Practical Marks are Editable</h3>
                    <DataTable value={this.state.data} editMode="cell" className="editable-cells-table" header="Data">
                        <Column field="RollNo" header="RollNo"></Column>
                        <Column field="Name" header="Name"></Column>
                        <Column field="Assessment" header="Assessment" editor={(props) => this.AssessmentEditor('data', props)}></Column>
                        <Column field="Practical" header="Practical" editor={(props) => this.PracticalEditor('data', props)}></Column>
                    </DataTable>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        infoBox: state.teacher.infoBox
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setInfoBox: (value) => dispatch( actions.setInfoBox(value) )
    };
};
  
export default connect( mapStateToProps, mapDispatchToProps )( DataTableEdit );
