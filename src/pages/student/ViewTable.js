import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
// import {setAuthRedirect} from '../../store/actions/auth';
import { ProgressSpinner } from 'primereact/progressspinner';
// import * as uris from '../../store/uris';
import * as actions from '../../store/actions/student';
// import './DataTable.css';

class DataTableView extends Component {
    componentDidMount() {
        if (this.props.activeSem === null)  this.props.setInfoBox({summary:"Info Message", detail: 'No Active Semester Selected!!!'});
        // this.props.setRedirectNULL();
        /* let i;
        for(i=0;i<this.props.semSubjectValues.length;i++){
            if ((this.props.semSubjectValues[i].classId === this.props.activeClass) &&
                (this.props.semSubjectValues[i].sem === this.props.activeSem) &&
                (this.props.semSubjectValues[i].group === this.props.activeGroup)){
                this.props.setActiveStudentIndex(i);
                break;
            }
        }
        //fetch(`http://localhost:3000/api/record/class?class=${this.props.tutorClass}&subjectCode=${this.props.subjectCode}&sem=1`)
        if (i === this.props.semSubjectValues.length && this.props.activeClass !== null){
            // let dat = this.props.classes.find((cls) => this.props.activeClass === cls.batch+cls.subCode+cls.group);
            // let sem = ((parseInt(this.props.activeSem[0])-1)*2+parseInt(this.props.activeSem[2])).toString();
            fetch(uris.FETCH_CLASS_STUDENT_lIST+'073BCESH603CD', { // TODO: change the hardcoded student list fetch, this.props.activeClass
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(res => res.json())
                .then(res => {
                    this.props.setsemSubjectValues({classId:this.props.activeClass, sem: this.props.activeSem, group: this.props.activeGroup, data: res.data, fm: res.fm});
                    this.props.setActiveStudentIndex(this.props.semSubjectValues.length-1);
                })
                .catch(err => console.log(err));
        } */
        this.props.setSemSubjectValues([{username: "SH401", name:"Engineering Mathematics", test: "20", practical: "50"},
                                        {username: "CT401", name:"Computer Programming", test: "20", practical: "50"},
                                        {username: "ME401", name:"Engineering Drawing", test: "20", practical: "50"},
                                        {username: "SH402", name:"Engineering Physics", test: "20", practical: "50"},
                                        {username: "CE401", name:"Applied Mechanics", test: "20", practical: "50"},
                                        {username: "EE401", name:"Basic Electrical Engineering", test: "20", practical: "50"}]);
        this.props.setActiveSemIndex(0);
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
                            <h3>Marks Summary View : Assessment and Practical Marks are NOT Editable</h3>
                            <DataTable value={recordDatas} header="Data">
                                <Column field="username" header="Subject Code"></Column>
                                <Column field="name" header="Subject Name"></Column>
                                <Column field="test" header="Assessment"></Column>
                                <Column field="practical" header="Practical"></Column>
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
        semSubjectValues: state.student.semSubjectValues,
        semIndex: state.student.activeSemSubjectValuesIndex,
        loading: state.student.loading,
        infoBox: state.student.infoBox
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // setRedirectNULL: () => dispatch(setAuthRedirect(null)),
        setSemSubjectValues: (values) => dispatch(actions.setSemSubjectValues(values)),
        setActiveSemIndex: (value) => dispatch(actions.setActiveSemIndex(value)),
        setInfoBox: (value) => dispatch( actions.setInfoBox(value) )
    };
};
  
export default connect( mapStateToProps, mapDispatchToProps )( DataTableView );
