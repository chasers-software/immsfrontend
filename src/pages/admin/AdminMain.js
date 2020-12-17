import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import CSVReader from 'react-csv-reader';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import TeacherService from '../../Service/TeacherService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
//import { FileUpload } from 'primereact/fileupload';
// import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
//import { InputTextarea } from 'primereact/inputtextarea';
// import { RadioButton } from 'primereact/radiobutton';
// import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import * as actions from '../../store/actions/admin';
import * as uris from '../../store/uris';
import './AdminMain.css';

class AdminMain extends Component {
    emptyTeacher = {
        person_id: '',
        username: '',
        full_name: '',
        email: '',
        phone_no: '',
        program_code: ''
    };

    constructor(props) {
        super();

        this.state = {
            redirect: null,
            teacherDialog: false,
            department: [],
            deleteTeacherDialog: false,
            deleteTeachersDialog: false,
            teacher: this.emptyTeacher,
            selectedTeachers: null,
            submitted: false,
            globalFilter: null
        };

        // this.program_codes = [{program_code: 'Electronics & Computer Engineering'},
        //                 {program_code: 'Civil Engineering'},
        //                 {program_code: 'Electrical Engineering'}];

        // this.teacherService = new TeacherService();
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        // this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveTeacher = this.saveTeacher.bind(this);
        this.editTeacher = this.editTeacher.bind(this);
        this.confirmDeleteTeacher = this.confirmDeleteTeacher.bind(this);
        this.deleteTeacher = this.deleteTeacher.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onProgramChange = this.onProgramChange.bind(this);
        this.hideDeleteTeacherDialog = this.hideDeleteTeacherDialog.bind(this);
        this.hideDeleteTeachersDialog = this.hideDeleteTeachersDialog.bind(this);
    }

    componentDidMount() {
        if (this.props.infoBox) {
          this.toast.show({severity: 'info', summary: this.props.infoBox.summary, detail: this.props.infoBox.detail})
        }
        this.props.setInfoBoxNULL();// this.teacherService.getTeachers().then(data => this.setState({ teachers: data }));
        fetch(uris.FETCH_DEPARTMENT_LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer '+this.props.token
            }
        })
            .then(res => res.json())
            .then(res => {this.setState({department: res.data})})
            .catch(err => console.log("Teacher err", err))
    }

    openNew() {
        this.setState({
            teacher: this.emptyTeacher,
            submitted: false,
            teacherDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            teacherDialog: false
        });
    }

    hideDeleteTeacherDialog() {
        this.setState({ deleteTeacherDialog: false });
    }

    hideDeleteTeachersDialog() {
        this.setState({ deleteTeachersDialog: false });
    }

    saveTeacher() {
        let state = { submitted: true };
        if (this.state.teacher.full_name && this.state.teacher.email && this.state.teacher.phone_no && this.state.teacher.program_code) {
            // let teachers = [...this.props.teachers];
            // let teacher = {...this.state.teacher};
            let toastMsg = null;
            let method = null;
            if (this.state.teacher.username) {
                // const index = this.findIndexByUsername(this.state.teacher.username);
                method = 'PATCH';
                // teachers[index] = teacher;
                toastMsg = 'Teacher Updated';
            }
            else {
                // teachers.push(teacher);
                method = 'POST';
                toastMsg = 'Teacher Created';
            }
            let i;
            for (i=0; i<this.state.department.length;i++){
                if (this.state.department[i].dept_name === this.state.teacher.program_code.dept_name) break;
            }
            // if (i === this.state.department.length) i = this.state.department.length-1;
            console.log(i)
            let temp = {...this.state.teacher, dept_id: this.state.department[i].dept_id};
            console.log(temp)
            fetch(uris.ADD_TEACHER+this.state.teacher.person_id, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer '+this.props.token
                },
                body: JSON.stringify(temp)
            })
                .then(fetch(uris.FETCH_TEACHER_LIST, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer '+this.props.token
                    }
                })
                    .then(res => res.json())
                    .then(res => {console.log(res);this.props.setTeachers(res.data)})
                    .catch(err => console.log("Teacher err", err)))
                .catch(err => console.log("Teacher err", err))
            this.toast.show({ severity: 'success', summary: 'Successful', detail: toastMsg, life: 3000 });

            state = {
                ...state,
                teacherDialog: false,
                teacher: this.emptyTeacher
            };
        }

        this.setState(state);
    }

    editTeacher(teacher) {
        console.log(teacher);
        this.setState({
            teacher: { ...teacher },
            teacherDialog: true
        });
    }

    teacherClickHandler(rowData){
        this.props.selectCard(rowData.person_id);
		this.setState({redirect: <Redirect to='/teachersessions'/>});
    }

    confirmDeleteTeacher(teacher) {
        this.setState({
            teacher,
            deleteTeacherDialog: true
        });
    }

    deleteTeacher() {
        let teachers = this.state.teachers.filter(val => val.id !== this.state.teacher.id);
        this.setState({
            teachers,
            deleteTeacherDialog: false,
            teacher: this.emptyTeacher
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Teacher Deleted', life: 3000 });
    }

    findIndexByUsername(id) {
        let index = -1;
        for (let i = 0; i < this.props.teachers.length; i++) {
            if (this.props.teachers[i].username === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId() {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    confirmDeleteSelected() {
        this.setState({ deleteTeachersDialog: true });
    }

    // deleteSelectedTeachers() {
    //     let teachers = this.state.teachers.filter(val => !this.state.selectedTeachers.includes(val));
    //     this.setState({
    //         teachers,
    //         deleteTeachersDialog: false,
    //         selectedTeachers: null
    //     });
    //     this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Teachers Deleted', life: 3000 });
    // }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let teacher = {...this.state.teacher};
        teacher[`${name}`] = val;

        this.setState({ teacher });
    }

    onProgramChange(e) { this.setState({teacher: {...this.state.teacher, program_code: e.value}})}

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
                {/* <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedTeachers || !this.state.selectedTeachers.length} /> */}
            </React.Fragment>
        )
    }

    rightToolbarTemplate() {
        return (
            <React.Fragment>
                <CSVReader onFileLoaded={(data, fileInfo) => console.log(data[0])} />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
            </React.Fragment>
        )
    }

    // statusBodyTemplate(rowData) {
    //     return <span className={`teacher-badge status-${rowData.status.toLowerCase()}`}>{rowData.status}</span>;
    // }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editTeacher(rowData)} />
                <Button icon='pi pi-briefcase' className="p-button-rounded p-button-info p-mr-2" onClick={() => this.teacherClickHandler(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-mr-2" onClick={() => this.confirmDeleteTeacher(rowData)} />
            </React.Fragment>
        );
    }

    render() {
        const header = (
            <div className="table-header">
                <h5 className="p-m-0">Manage Teachers</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        );
        const teacherDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveTeacher} />
            </React.Fragment>
        );
        const deleteTeacherDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteTeacherDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteTeacher} />
            </React.Fragment>
        );
        // const deleteTeachersDialogFooter = (
        //     <React.Fragment>
        //         <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteTeachersDialog} />
        //         <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedTeachers} />
        //     </React.Fragment>
        // );

        return (<Fragment>
            <Toast style={{zIndex: 10000}} ref={(el) => this.toast = el} />
            {this.props.loading ?  <div style={{paddingTop: '50px'}}><ProgressSpinner style={{width: '100%'}}/></div> :
            <div className="datatable-crud-demo">
            <div className="card">
                <Toolbar className="p-mb-4" style={{marginTop: '20px'}} left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>
                {/* selection={this.state.selectedTeachers} onSelectionChange={(e) => this.setState({ selectedTeachers: e.value })} */}
                <DataTable ref={(el) => this.dt = el} value={this.props.teachers}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} teachers"
                    globalFilter={this.state.globalFilter}
                    header={header}>

                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                    <Column field="username" header="UserName" sortable></Column>
                    <Column field="full_name" header="Full Name" sortable></Column>
                    <Column field="email" header="Email" ></Column>
                    <Column field="phone_no" header="Phone No"  ></Column>
                    <Column field="program_code" header="Department" sortable></Column>
                    <Column body={this.actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={this.state.teacherDialog} style={{ width: '450px' }} header="Teacher Details" modal className="p-fluid" footer={teacherDialogFooter} onHide={this.hideDialog}>
                {/* {this.state.teacher.image && <img src={`showcase/demo/images/teacher/${this.state.teacher.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={this.state.teacher.image} className="teacher-image" />} */}
                <div className="p-field">
                    <label htmlFor="full_name">Name</label>
                    <InputText id="full_name" value={this.state.teacher.full_name} onChange={(e) => this.onInputChange(e, 'full_name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.teacher.full_name })} />
                    {this.state.submitted && !this.state.teacher.full_name && <small className="p-invalid">Name is required.</small>}
                </div>
                 <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <InputText id="email" value={this.state.teacher.email} onChange={(e) => this.onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.teacher.email })} />
                    {this.state.submitted && !this.state.teacher.email && <small className="p-invalid">Email is required.</small>}
                </div>
                 <div className="p-field">
                    <label htmlFor="phone_no">Phone No:</label>
                    <InputText id="phone_no" value={this.state.teacher.phone_no} onChange={(e) => this.onInputChange(e, 'phone_no')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.teacher.phone_no })} />
                    {this.state.submitted && !this.state.teacher.phone_no && <small className="p-invalid">Phone No is required.</small>}
                </div>
                <div>
                    <label htmlFor="Department">Department</label>
                    <Dropdown value={this.state.teacher.program_code} options={this.state.department} onChange={this.onProgramChange} optionLabel="dept_name" required placeholder="Select a Department"/>
                    {this.state.submitted && !this.state.teacher.program_code && <small className="p-invalid">Department is required.</small>}
                </div>
{/*                     
                <div className="p-field">
                    <label className="p-mb-3">Subject</label>
                    <div className="p-formgrid p-grid">
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category1" name="category" value="074BCT" onChange={this.onCategoryChange} checked={this.state.teacher.category === 'Accessories'} />
                            <label htmlFor="category1">074BCT</label>
                        </div>
                         <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category2" name="category" value="074BCT" onChange={this.onCategoryChange} checked={this.state.teacher.category === 'Accessories'} />
                            <label htmlFor="category1">074BCE</label>
                        </div>
                        
                    </div>
                </div> */}

            </Dialog>

            <Dialog visible={this.state.deleteTeacherDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteTeacherDialogFooter} onHide={this.hideDeleteTeacherDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {this.state.teacher && <span>Are you sure you want to delete <b>{this.state.teacher.email}</b>?</span>}
                </div>
            </Dialog>

            {/* <Dialog visible={this.state.deleteTeachersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteTeachersDialogFooter} onHide={this.hideDeleteTeachersDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {this.state.teacher && <span>Are you sure you want to delete the selected teachers?</span>}
                </div>
            </Dialog> */}
        </div>}
        {this.state.redirect}
        </Fragment>
        );
    }
}
                
const mapStateToProps = state => {
    return {
      teachers: state.admin.teachers,
      infoBox: state.admin.infoBox,
    //   redirect: state.auth.redirect,
      loading: state.admin.loading    
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      selectCard: (Class) => dispatch(actions.setActiveTeacherUsername(Class)),
      setInfoBoxNULL: () => dispatch( actions.setInfoBox(null) ),
      setTeachers: (value) => dispatch(actions.setTeachers(value)),
    //   setRedirect: () => dispatch(setAuthRedirect(<Redirect to='/marksview'/>))
    };
  };
  
  export default connect( mapStateToProps, mapDispatchToProps )( AdminMain );
