import React, { Component, Fragment } from 'react';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
import * as uris from '../../store/uris';
import * as actions from '../../store/actions/admin';
import './TeacherSessions.css';

class TeacherSessions extends Component {
    emptyLecture = {
        batch: '',
        subject_code: '',
        group_code: '',
        program_code: ''
    }
    constructor(props){
        super();
        this.state = {
            redirect: null,
            lectureDialog: false,
            submitted: false,
            lecture: this.emptyLecture,
            batchs: ['074'],
            programs: ["BCT","BEX"],
            subjects: [],
            groups: []
        }
        this.addClass = this.addClass.bind(this);
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveTeacher = this.saveTeacher.bind(this);
        this.onProgramChange = this.onProgramChange.bind(this);
    }

    componentDidMount(){        
        if (this.props.activeTeacher === null)  this.props.setInfoBox({summary:"Info Message", detail: 'No Active Teacher Selected!!!'});
        let i;
        for(i=0;i<this.props.teacherClassValues.length;i++){
            if (this.props.teacherClassValues[i].username === this.props.activeTeacher){
                this.props.setActiveTeacherIndex(i);
                break;
            }
        }
        if (i === this.props.teacherClassValues.length && this.props.activeTeacher !== null){
            fetch(uris.FETCH_CLASS_LIST+this.props.activeTeacher, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer '+this.props.token
                }
            })
                .then(res => res.json())
                .then(res => {
                    this.props.setActiveTeacherIndex(this.props.teacherClassValues.length);
                    this.props.setActiveTeacherClasses({username:this.props.activeTeacher, data: res.data}); // TODO: get fullmarks as well
                })
                .catch(err => console.log(err));
        }
    }

    addClass(){
        this.setState({
            teacher: this.emptyLecture,
            submitted: false,
            lectureDialog: true
        });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.addClass} />
                {/* <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedTeachers || !this.state.selectedTeachers.length} /> */}
            </React.Fragment>
        )
    }

    hideDialog() {
        this.setState({
            submitted: false,
            lectureDialog: false
        });
    }

    saveTeacher() {
        let state = { submitted: true };
        console.log(this.state.teacher)
        if (this.state.lecture.group_code) {
            let program = this.state.lecture.program_code // TODO: get program code from program name
            let subCode = '' // TODO: get subject code from subjct name
            let data = { username: this.props.activeTeacherUsername,
                        section_code: this.state.lecture.batch+program+this.state.lecture.group_code,
                        subject_code: subCode}
            fetch(uris.FETCH_CLASS_LIST, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer '+this.props.token
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    this.props.resetTeacherClasses();
                    fetch(uris.FETCH_CLASS_LIST+this.props.activeTeacher, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Authorization': 'Bearer '+this.props.token
                        }
                    })
                        .then(res => res.json())
                        .then(res => {
                            this.props.setActiveTeacherIndex(this.props.teacherClassValues.length);
                            this.props.setActiveTeacherClasses({username:this.props.activeTeacher, data: res.data}); // TODO: get fullmarks as well
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log("Teacher err", err))
            this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Lecture Added', life: 3000 });
            state = {
                ...state,
                lectureDialog: false,
                lecture: this.emptyLecture
            };
        }

        this.setState(state);
    }

    onBatchChange(e) {
        let temp = this.state.lecture;
        temp.batch = e.value
        this.setState({ lecture: temp });
    }

    onProgramChange(e) {
        let temp = this.state.lecture;
        temp.program_code = e.value
        this.setState({ lecture: temp });
    }

    onSubjectChange(e) {
        let temp = this.state.lecture;
        temp.subject_code = e.value
        this.setState({ lecture: temp });
    }

    onGroupChange(e) {
        let temp = this.state.lecture;
        temp.group_code = e.value
        this.setState({ lecture: temp });
    }

    onDeleteLecture(index){
        console.log(index); // TODO: detete the lecture after popup coonfirmation
    }

    render (){
        const lectureDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Add" icon="pi pi-check" className="p-button-text" onClick={this.saveTeacher} />
            </React.Fragment>
        );
        return (
            <Fragment>
                {this.props.infoBox ? <Redirect to='/'/> : null}
                {this.props.loading ? <div style={{paddingTop: '50px'}}><ProgressSpinner style={{width: '100%'}}/></div> : <Fragment>
            {/* <div className='additionContainer'>
                <Dropdown value={{department: this.state.teacher.department}} options={this.cities} onChange={this.onCityChange} optionLabel="department" required placeholder="Select a Department"/>
                <Dropdown value={{department: this.state.teacher.department}} options={this.cities} onChange={this.onCityChange} optionLabel="department" required placeholder="Select a Department"/>
                <Dropdown value={{department: this.state.teacher.department}} options={this.cities} onChange={this.onCityChange} optionLabel="department" required placeholder="Select a Department"/>
            </div> */}
            {/* <Card key={index} title={data.subCode} subTitle={data.subName} style={{ width: "20em" }}
                                            className="p-shadow-8 p-mb-2 p-mr-3" footer={<Button style={{width: "100%"}} label="Remove"
                                            onClick={() => this.onCardSelectHandler(data)}/>}>
                                          <span style={{margin: "0 1em 0 0"}} className="p-tag p-badge-secondary p-tag-rounded">{data.batch}</span>
                                          <span className="p-tag p-badge-secondary p-tag-rounded">{data.group}</span>
                                          <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
                                        </Card> */}
                <Toolbar style={{marginTop: '20px'}} className="p-mb-4" left={this.leftToolbarTemplate}></Toolbar>
                <div className="p-lg-12 p-d-flex p-flex-wrap p-flex-column p-flex-lg-row">
                {this.props.teacherClassValues.length === 0 ? null : this.props.teacherClassValues[this.props.teacherIndex].data.map((data, index) => {
                                return (<Card key={index} title={data.subject_code} subTitle={data.title} style={{ width: "20em" }}
                                            className="p-shadow-8 p-mb-3 p-mr-3" footer={<Button style={{width: "100%"}} label="Remove"
                                            onClick={() => this.onDeleteLecture(index)}/>}>
                                          <span style={{margin: "0 1em 0 0"}} className="p-tag p-badge-secondary p-tag-rounded">{data.section_code.slice(0,-2)}</span>
                                          <span className="p-tag p-badge-secondary p-tag-rounded">{data.section_code.slice(-2,)}</span>
                                          <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
                                        </Card>)})}
                </div>
                <Dialog visible={this.state.lectureDialog} style={{ width: '450px' }} header="Lecture Details" modal className="p-fluid" footer={lectureDialogFooter} onHide={this.hideDialog}>
                {/* {this.state.teacher.image && <img src={`showcase/demo/images/teacher/${this.state.teacher.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={this.state.teacher.image} className="teacher-image" />} */}
                <div>
                    <label htmlFor="Batch">Batch</label>
                    <Dropdown value={this.state.lecture.batch} options={this.state.batchs} onChange={this.onBatchChange} required placeholder="Select a Batch"/>
                    {this.state.submitted && !this.state.lecture.batch && <small className="p-invalid">Batch is required.</small>}
                </div>
                <div>
                    <label htmlFor="Program">Program</label>
                    <Dropdown value={this.state.lecture.program_code} options={this.state.programs} onChange={this.onProgramChange} required placeholder="Select a Program"/>
                    {this.state.submitted && !this.state.lecture.program_code && <small className="p-invalid">Program is required.</small>}
                </div>
                <div>
                    <label htmlFor="Subject">Subject</label>
                    <Dropdown value={this.state.lecture.subject_code} options={this.state.subjects} onChange={this.onSubjectChange} required placeholder="Select a Subject"/>
                    {this.state.submitted && !this.state.lecture.subject_code && <small className="p-invalid">Subject is required.</small>}
                </div>
                <div>
                    <label htmlFor="Group">Group</label>
                    <Dropdown value={this.state.lecture.group_code} options={this.state.groups} onChange={this.onGroupChange} required placeholder="Select a Group"/>
                    {this.state.submitted && !this.state.lecture.group_code && <small className="p-invalid">Group is required.</small>}
                </div>

            </Dialog>
                </Fragment>}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeTeacher: state.admin.activeTeacherUsername,
        teacherClassValues: state.admin.activeTeacherClasses,
        teacherIndex: state.admin.activeTeacherClassValuesIndex,
        loading: state.admin.loading,
        infoBox: state.admin.infoBox
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // setRedirectNULL: () => dispatch(setAuthRedirect(null)),
        setActiveTeacherClasses: (value) => dispatch(actions.setActiveTeacherClasses(value)),
        setActiveTeacherUsername: (value) => dispatch(actions.setActiveTeacherUsername(value)),
        setActiveTeacherIndex: (value) => dispatch(actions.setActiveTeacherIndex(value)),
        setInfoBox: (value) => dispatch( actions.setInfoBox(value) ),
        resetTeacherClasses: () => dispatch(actions.resetAdminTeacherClass())
    };
};
  
export default connect( mapStateToProps, mapDispatchToProps )( TeacherSessions );
