import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import {setAuthRedirect} from '../../store/actions/auth';
import { ProgressSpinner } from 'primereact/progressspinner';
import * as uris from '../../store/uris';
import * as actions from '../../store/actions/teacher';
import './DataTable.css';

class DataTableView extends Component {
    constructor(props){
        super(props);
        this.exportCSV = this.exportCSV.bind(this);
    }
    componentDidMount() {
        if (!this.props.activeClass) this.props.setInfoBox({summary:"Info Message", detail: 'No Active Class Selected!!!'});
        this.props.setRedirectNULL();
        let i;
        for(i=0;i<this.props.classStudentValues.length;i++){
            if (this.props.classStudentValues[i].classId === this.props.activeClass){
                this.props.setActiveStudentIndex(i);
                break;
            }
        }
        //fetch(`http://localhost:3000/api/record/class?class=${this.props.tutorClass}&subjectCode=${this.props.subjectCode}&sem=1`)
        if (i === this.props.classStudentValues.length && this.props.activeClass !== null){
            // let dat = this.props.classes.find((cls) => this.props.activeClass === cls.batch+cls.subCode+cls.group);
            // let sem = ((parseInt(this.props.activeSem[0])-1)*2+parseInt(this.props.activeSem[2])).toString();
            fetch(uris.FETCH_CLASS_STUDENT_LIST+this.props.activeClass, { // TODO: change the hardcoded student list fetch, this.props.activeClass
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(res => res.json())
                .then(res => {
                    this.props.setClassStudentValues({classId:this.props.activeClass, data: res.data}); // TODO: get fullmarks as well
                    this.props.setActiveStudentIndex(this.props.classStudentValues.length-1);
                })
                .catch(err => console.log(err));
        }
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    render() {
        let recordDatas = this.props.classStudentValues[this.props.classIndex];
        return (
            <Fragment>
                {this.props.infoBox ? <Redirect to='/'/> : null}
                {this.props.loading ? <div style={{paddingTop: '50px'}}><ProgressSpinner style={{width: '100%'}}/></div> :
                <Fragment>
                    {recordDatas ? (
                        <div className="datatable-editing">
                        <Toast ref={(el) => this.toast = el} />
                        
                        <div className="card">
                            <h3 style={{color: '#B22222'}}>Marks Summary View : Assessment and Practical Marks are NOT Editable</h3>
                            <div className="p-col p-offset-11">
                                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
                            </div>
                            <DataTable ref={(el) => this.dt = el}  value={recordDatas.data} header={"Student Data for Section "+this.props.sectionSubject[0]+" of Subject with Subject Code : "+this.props.sectionSubject[1]}>
                                <Column field="username" header="RollNo" sortable></Column>
                                <Column field="full_name" header="Name"></Column>
                                <Column field="theory_marks" header="Assessment" sortable></Column>
                                <Column field="practical_marks" header="Practical" sortable></Column>
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
        activeClass: state.teacher.activeClass,
        classStudentValues: state.teacher.classStudentValues,
        classIndex: state.teacher.activeClassStudentValuesIndex,
        sectionSubject: state.teacher.activeSectionSubject,
        loading: state.teacher.loading,
        infoBox: state.teacher.infoBox
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setRedirectNULL: () => dispatch(setAuthRedirect(null)),
        setClassStudentValues: (values) => dispatch(actions.setClassStudentValues(values)),
        setActiveStudentIndex: (value) => dispatch(actions.setActiveStudentIndex(value)),
        setInfoBox: (value) => dispatch( actions.setInfoBox(value) )
    };
};
  
export default connect( mapStateToProps, mapDispatchToProps )( DataTableView );
