import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import * as uris from '../../store/uris';
import * as actions from '../../store/actions/admin';
import './TeacherSessions.css';

class TeacherSessions extends Component {
    emptyLecture = {
        batch: '',
        subject_code: '',
        group_code: '',
        program_code: '',
        semester: ''
    }
    constructor(props){
        super();
        this.state = {
            redirect: null,
            lectureDialog: false,
            submitted: false,
            displayConfirmation: false,
            lectureSel: {
                batch_is: '',
                program_id: '',
                subject_id: '',
                section_id: '',
                semester: ''
            },
            lecture: this.emptyLecture,
            batchs: ['074'],
            programs: ["BCT","BEX"],
            subjects: [],
            sections: [],
            semesters: [1,2,3,4,5,6,7,8]
        }
        this.addClass = this.addClass.bind(this);
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveTeacher = this.saveTeacher.bind(this);
        this.onProgramChange = this.onProgramChange.bind(this);
        this.onBatchChange = this.onBatchChange.bind(this);
        this.onSubjectChange = this.onSubjectChange.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
        this.onSemChange = this.onSemChange.bind(this);
        this.onDeleteLecture = this.onDeleteLecture.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentDidMount(){        
        if (this.props.activeTeacher === null) { this.props.setInfoBox({summary:"Info Message", detail: 'No Active Teacher Selected!!!'}); }
        else {
            let i;
            for(i=0;i<this.props.teacherClassValues.length;i++){
                if (this.props.teacherClassValues[i].username === this.props.activeTeacher){
                    this.props.setActiveTeacherIndex(i);
                    break;
                }
            }
            if (i === this.props.teacherClassValues.length && this.props.activeTeacher !== null){
                fetch(uris.FETCH_CLASS_LIST+'?person_id='+this.props.activeTeacher, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            this.props.setActiveTeacherIndex(this.props.teacherClassValues.length);
                            this.props.setActiveTeacherClasses({username:this.props.activeTeacher, data: res.data});
                        } else {
                            this.toast.show({severity: 'error', summary: 'Class List Fetch Failed', detail: res.message});
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
        
    }

    addClass(){
        fetch(uris.FETCH_BATCH_LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => this.setState({batchs: res.data}))
            .catch(err => console.log(err));
        
            fetch(uris.FETCH_PROGRAM_LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => this.setState({programs: res.data}))
            .catch(err => console.log(err));

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
        if (this.state.lecture.group_code) {
            let data = { person_id: this.props.activeTeacher,
                        section_id: this.state.lectureSel.section_id,
                        subject_id: this.state.lectureSel.subject_id}
            fetch(uris.FETCH_CLASS_LIST, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    this.props.resetTeacherClasses();
                    fetch(uris.FETCH_CLASS_LIST+'?person_id='+this.props.activeTeacher, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then(res => res.json())
                        .then(res => {
                            this.props.setActiveTeacherIndex(this.props.teacherClassValues.length);
                            this.props.setActiveTeacherClasses({username:this.props.activeTeacher, data: res.data}); // TODO: get fullmarks as well
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err))
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
        temp.batch = e.value;
        this.setState({ lecture: temp, lectureSel: {...this.state.lectureSel, batch_id: e.value.batch_id} });
    }

    onProgramChange(e) {
        let temp = this.state.lecture;
        temp.program_code = e.value;
        this.setState({ lecture: temp, lectureSel: {...this.state.lectureSel, program_id: e.value.program_id} });
        fetch(uris.FETCH_SECTION_LIST+'?batch_id='+this.state.lectureSel.batch_id+'&program_id='+e.value.program_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {this.setState({sections: res.data})})
            .catch(err => console.log(err));
    }
    
    onGroupChange(e) {
        let temp = this.state.lecture;
        temp.group_code = e.value
        this.setState({ lecture: temp, lectureSel: {...this.state.lectureSel, section_id: e.value.section_id} });
    }

    onSemChange(e) {
        let temp = this.state.lecture;
        temp.semester = e.value
        this.setState({ lecture: temp, lectureSel: {...this.state.lectureSel, semester: e.value} });
        fetch(uris.FETCH_SUBJECT_LIST+'?program_id='+this.state.lectureSel.program_id+'&semester='+e.value, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {console.log(res);this.setState({subjects: res.data})})
            .catch(err => console.log(err));
    }

    onSubjectChange(e) {
        let temp = this.state.lecture;
        temp.subject_code = e.value
        this.setState({ lecture: temp, lectureSel: {...this.state.lectureSel, subject_id: e.value.subject_id}  });
    }

    onDeleteLecture(){
        fetch(uris.FETCH_CLASS_LIST+this.props.teacherClassValues[this.props.teacherIndex].data[this.state.delIndex].lecture_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    this.props.resetTeacherClasses();
                    fetch(uris.FETCH_CLASS_LIST+'?person_id='+this.props.activeTeacher, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then(res => res.json())
                        .then(res => {
                            this.props.setActiveTeacherIndex(this.props.teacherClassValues.length);
                            this.props.setActiveTeacherClasses({username:this.props.activeTeacher, data: res.data}); // TODO: get fullmarks as well
                        })
                        .catch(err => console.log(err));
                } else {
                    this.toast.show({severity: 'error', summary: 'Lecture Remove Failed', detail: res.message});
                }
            })
            .catch(err => console.log(err));
    }

    onClick(name, position) {
        let state = {
            [`${name}`]: true,
            delIndex: position
        };
        this.setState(state);
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }

    onApprove(name) {
        this.setState({
            [`${name}`]: false
        });
        this.onDeleteLecture();
    }

    renderFooter(name) {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => this.onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => this.onApprove(name)} autoFocus />
            </div>
        );
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
                <Toast ref={(el) => this.toast = el} />
                {this.props.infoBox ? <Redirect to='/'/> : null}
                {this.props.loading ? <div style={{paddingTop: '50px'}}><ProgressSpinner style={{width: '100%'}}/></div> : <Fragment>
                {this.props.teacherClassValues.length>this.props.teacherIndex ? <Fragment>
                    <Toolbar style={{marginTop: '20px'}} className="p-mb-4" left={this.leftToolbarTemplate}></Toolbar>
                <div className="p-lg-12 p-d-flex p-flex-wrap p-flex-column p-flex-lg-row">
                {this.props.teacherClassValues.length === 0 ? null : this.props.teacherClassValues[this.props.teacherIndex].data.map((data, index) => {
                                return (<Card key={index} title={data.subject_code} subTitle={data.title} style={{ width: "20em" }}
                                            className="p-shadow-8 p-mb-3 p-mr-3" footer={<Button style={{width: "100%"}} label="Remove"
                                            onClick={() => this.onClick('displayConfirmation', index)}/>}>
                                          <span style={{margin: "0 1em 0 0"}} className="p-tag p-badge-secondary p-tag-rounded">{data.section_code.slice(0,-2)}</span>
                                          <span className="p-tag p-badge-secondary p-tag-rounded">{data.section_code.slice(-2,)}</span>
                                          <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
                                        </Card>)})}
                </div>
                <Dialog visible={this.state.lectureDialog} style={{ width: '450px' }} header="Lecture Details" modal className="p-fluid" footer={lectureDialogFooter} onHide={this.hideDialog}>
                <div>
                    <label htmlFor="Batch">Batch</label>
                    <Dropdown value={this.state.lecture.batch} options={this.state.batchs} onChange={this.onBatchChange} optionLabel="batch_code" required placeholder="Select a Batch"/>
                    {this.state.submitted && !this.state.lecture.batch && <small className="p-invalid">Batch is required.</small>}
                </div>
                <div>
                    <label htmlFor="Program">Program</label>
                    <Dropdown value={this.state.lecture.program_code} options={this.state.programs} onChange={this.onProgramChange} optionLabel="program_code" required placeholder="Select a Program"/>
                    {this.state.submitted && !this.state.lecture.program_code && <small className="p-invalid">Program is required.</small>}
                </div>
                <div>
                    <label htmlFor="Section">Section</label>
                    <Dropdown value={this.state.lecture.group_code} options={this.state.sections} onChange={this.onGroupChange} optionLabel="section_code" required placeholder="Select a Section"/>
                    {this.state.submitted && !this.state.lecture.group_code && <small className="p-invalid">Section is required.</small>}
                </div>
                <div>
                    <label htmlFor="Semester">Semester</label>
                    <Dropdown value={this.state.lecture.semester} options={this.state.semesters} onChange={this.onSemChange} required placeholder="Select a Semester"/>
                    {this.state.submitted && !this.state.lecture.semester && <small className="p-invalid">Semester is required.</small>}
                </div>
                <div>
                    <label htmlFor="Subject">Subject</label>
                    <Dropdown value={this.state.lecture.subject_code} options={this.state.subjects} onChange={this.onSubjectChange} optionLabel="title" required placeholder="Select a Subject"/>
                    {this.state.submitted && !this.state.lecture.subject_code && <small className="p-invalid">Subject is required.</small>}
                </div>
            </Dialog>
            <Dialog header="Confirmation" visible={this.state.displayConfirmation} modal style={{ width: '350px' }} footer={this.renderFooter('displayConfirmation')} onHide={() => this.onHide('displayConfirmation')}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        <span>Are you sure you want to proceed?</span>
                </div>
            </Dialog>
            </Fragment>:null}
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
        setActiveTeacherClasses: (value) => dispatch(actions.setActiveTeacherClasses(value)),
        setActiveTeacherUsername: (value) => dispatch(actions.setActiveTeacherUsername(value)),
        setActiveTeacherIndex: (value) => dispatch(actions.setActiveTeacherIndex(value)),
        setInfoBox: (value) => dispatch( actions.setInfoBox(value) ),
        resetTeacherClasses: () => dispatch(actions.resetAdminTeacherClass())
    };
};
  
export default connect( mapStateToProps, mapDispatchToProps )( TeacherSessions );
