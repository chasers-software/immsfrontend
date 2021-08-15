import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import * as uris from '../../store/uris';
import * as actions from '../../store/actions/student';

class DataTableView extends Component {
    constructor(props){
        super(props);
        this.onRequestRecheck = this.onRequestRecheck.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    }
    componentDidMount() {
        if (this.props.activeSem === null)  this.props.setInfoBox({summary:"Info Message", detail: 'No Active Semester Selected!!!'});
        let i;
        for(i=0;i<this.props.semSubjectValues.length;i++){
            if (this.props.semSubjectValues[i].sem === this.props.activeSem){
                this.props.setActiveSemIndex(i);
                break;
            }
        }
        if (i === this.props.semSubjectValues.length && this.props.activeSem !== null){
            fetch(uris.FETCH_STUDENT_SEM_MARKS+'?person_id='+this.props.username+'&semester='+this.props.activeSem.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(res => res.json())
                .then(res => {
                    if (res.status === 'success') {
                        this.props.setSemSubjectValues({sem: this.props.activeSem, data: res.data});
                        this.props.setActiveSemIndex(this.props.semSubjectValues.length-1);
                    } else {
                        this.toast.show({severity: 'error', summary: 'Student Semester Marks Fetch Failed', detail: res.message});
                    }
                })
                .catch(err => console.log(err));
        }
    }

    onRequestRecheck(rowData){
        fetch(uris.REQUEST_STUDENT_MARKS_RECHECK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person_id: this.props.username,
                subject_id: rowData.subject_id
            })
        })
            .then(res => res.json())
            .then(res => {this.toast.show({severity: 'info', summary: 'Info"', detail: 'Marks Recheck Request Sent!!!'})})
            .catch(err => console.log(err))
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button label="Request Recheck" className="p-button-rounded p-button-danger" onClick={() => this.onRequestRecheck(rowData)}/>
            </React.Fragment>
        );
    }

    render() {
        let recordDatas = this.props.semSubjectValues[this.props.semIndex];
        return (
            <Fragment>
                {this.props.infoBox ? <Redirect to='/'/> : null}
                {this.props.loading ? <div style={{paddingTop: '50px'}}><ProgressSpinner style={{width: '100%'}}/></div> :
                <Fragment>
                    {recordDatas ? (
                        <div className="datatable-editing">
                        <Toast ref={(el) => this.toast = el} />
                        
                        <div className="card">
                            <h3>Marks Summary View : Assessment Marks are NOT Editable</h3>
                            <DataTable value={recordDatas.data} header={"Subject Marks for Semester "+this.props.activeSem}>
                                <Column field="subject_code" header="Subject Code"></Column>
                                <Column field="title" header="Subject Name"></Column>
                                <Column field="theory_marks" header="Assessment"></Column>
                                <Column body={this.actionBodyTemplate}></Column>
                            </DataTable>
                        </div>
                        </div>
                    ) : null}
                </Fragment>}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeSem: state.student.activeSem,
        username: state.auth.username,
        semSubjectValues: state.student.semSubjectValues,
        semIndex: state.student.activeSemSubjectValuesIndex,
        loading: state.student.loading,
        infoBox: state.student.infoBox
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setSemSubjectValues: (values) => dispatch(actions.setSemSubjectValues(values)),
        setActiveSemIndex: (value) => dispatch(actions.setActiveSemIndex(value)),
        setInfoBox: (value) => dispatch( actions.setInfoBox(value) )
    };
};
  
export default connect( mapStateToProps, mapDispatchToProps )( DataTableView );
