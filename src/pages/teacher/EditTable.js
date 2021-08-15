import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import * as actions from '../../store/actions/teacher';
import { Button } from 'primereact/button';
import './DataTable.css';
import * as uris from '../../store/uris';
import { isInt } from '@fullcalendar/core';
const numberToText = require('number-to-text')
require('number-to-text/converters/en-us');

class DataTableEdit extends Component {

    constructor(props) {
        super();
        this.state = { data: null}
        this.toast = null;
        this.onMarksSubmitHandler = this.onMarksSubmitHandler.bind(this);
        this.remarksBodyTemplate = this.remarksBodyTemplate.bind(this);
        this.onRemarksChange = this.onRemarksChange.bind(this);
    }

    componentDidMount(){
        if (!this.props.activeClass) {
            this.props.setInfoBox({summary:"Info Message", detail: 'No Active Class Selected!!!'});
        } else {
            this.setState({data: this.props.classStudentValues[this.props.classIndex].data});
        }        
    }

    onEditorValueChange(stateItem, props, value) {
        let updatedProducts = [...props.value];
        console.log(updatedProducts);
        let update = false;
        if (!isInt(parseInt(value))){
            value=0;
        }
        switch (props.field){
            case "theory_marks": 
                update = (parseInt(value) >=0 && parseInt(value) <= this.props.sectionSubject[2]);
                if (update)
                { 
                    updatedProducts[props.rowIndex].theorymarks_inwords=numberToText.convertToText(parseInt(value));
                    if (parseInt(value) < 8 ) updatedProducts[props.rowIndex].remarks = 'NQ';
                    else if(parseInt(value)>=8) updatedProducts[props.rowIndex].remarks= "Regular"
                }
                break;
            case "practical_marks": update = (parseInt(value) >=0 && parseInt(value) <= this.props.sectionSubject[3]);
                break;
            default: update = false;
        }
        if (update) {
            updatedProducts[props.rowIndex][props.field] = parseInt(value);
            this.setState({ [`${stateItem}`]: updatedProducts })
        }
    }

    inputTextEditor(stateItem, props, field) {
        return <InputText style={{width: "5em"}} type="number" value={props.rowData[field]} onChange={(e) => this.onEditorValueChange(stateItem, props, e.target.value)} />;
    }

    AssessmentEditor(stateItem, props) {
        return this.inputTextEditor(stateItem, props, 'theory_marks');
    }

    PracticalEditor(stateItem, props) {
        return this.inputTextEditor(stateItem, props, 'practical_marks');
    }

    onMarksSubmitHandler(event){
        event.preventDefault();
        let currClassVals = [...this.state.data];

        fetch(uris.FETCH_CLASS_STUDENT_LIST+this.props.activeClass,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.data)
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    this.props.updateValues(currClassVals);
                    this.toast.show({severity: 'info', summary: 'Submission Succeded', detail: 'The Marks has been Successfully Updated!!!'});
                } else {
                    this.toast.show({severity: 'error', summary: 'Submission Failed', detail: res.message});
                }
            })
            .catch(err => console.log(err))
    }

    onRemarksChange(rowData, e) {
        let currClassVals = [...this.state.data];
        console.log("curr class vals",currClassVals);
        console.log("rowdata", rowData, "e", e);
        for (let i=0;i<currClassVals.length;i++){
            if (rowData.username === currClassVals[i].username) {
                currClassVals[i].remarks = e.value;
                if (e.value==="Absent"||e.value==="NQ")
                    currClassVals[i].theory_marks=0;
                break;
            }
        }
        this.setState({data: currClassVals});
    }

    remarksBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Dropdown value={rowData.remarks} options={['NQ','Absent','Regular']} onChange={(e) => this.onRemarksChange(rowData,e)} required placeholder="Select a Remark"/>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className="datatable-editing">
                <Toast ref={(el) => this.toast = el} />
                {this.props.infoBox ? <Redirect to='/'/> : null}
                <div className="card">
                    <h3 style={{color: '#228B22'}}>Marks Editing View : Assessment and Practical Marks are Editable</h3>
                    <div style={{padding: "10px 0", display: "flex", justifyContent: "flex-end"}}>
                        <Button label="Confirm & Submit" onClick={this.onMarksSubmitHandler}/>
                    </div>
                    <DataTable value={this.state.data} editMode="cell" className="editable-cells-table" header={this.props.activeClass ? "Student Data for Section "+this.props.sectionSubject[0]+
                    " of Subject with Subject Code : "+this.props.sectionSubject[1]+" ------ TheoryFM: "+this.props.sectionSubject[2] : null}>
                        <Column field="username" style={{width: '150px'}} header="RollNo" sortable></Column>
                        <Column field="full_name" style={{width: '350px'}} header="Name" sortable></Column>
                        <Column field="theory_marks" style={{width: '150px'}} header="Assessment" editor={(props) => this.AssessmentEditor('data', props)}></Column>                      
                        <Column header="Remarks" style={{width: '150px'}} body={this.remarksBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        infoBox: state.teacher.infoBox,
        classStudentValues: state.teacher.classStudentValues,
        classIndex: state.teacher.activeClassStudentValuesIndex,
        sectionSubject: state.teacher.activeSectionSubject,
        activeClass: state.teacher.activeClass,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setInfoBox: (value) => dispatch( actions.setInfoBox(value) ),
        updateValues: (value) => dispatch(actions.updateClassStudentValues(value)),
    };
};
  
export default connect( mapStateToProps, mapDispatchToProps )( DataTableEdit );
