import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import React, { Component } from 'react';
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
import './AdminMain.css';

class AdminMain extends Component {

    emptyTeacher = {
        name: '',
        email: '',
        contact: '',
        department: '',
        status: 0
    };

    constructor(props) {
        super();

        this.state = {
            teachers: null,
            teacherDialog: false,
            deleteTeacherDialog: false,
            deleteTeachersDialog: false,
            teacher: this.emptyTeacher,
            selectedTeachers: null,
            submitted: false,
            globalFilter: null
        };

        this.departments = [{department: 'Electronics & Computer Engineering'},
                        {department: 'Civil Engineering'},
                        {department: 'Electrical Engineering'}];

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
        this.onCityChange = this.onCityChange.bind(this);
        this.hideDeleteTeacherDialog = this.hideDeleteTeacherDialog.bind(this);
        this.hideDeleteTeachersDialog = this.hideDeleteTeachersDialog.bind(this);
    }

    componentDidMount() {
        this.setState({teachers: [{id: 'qweda', name: 'Teacher1', email:'qwertyzxc@gmai.com', contact:'9874563210', department: 'Electronics & Computer Engineering', status: 'online'},
                                    {id: 'asdaa', name: 'Teacher1', email:'fsdfwefrweqc@gmai.com', contact:'98765230140', department: 'Electronics & Computer Engineering', status: 'online'},
                                    {id: 'dgsxv',name: 'Teacher3', email:'qwertyzxc@gmai.com', contact:'9874563210', department: 'Electronics & Computer Engineering', status: 'online'},
                                    {id: 'sfdva',name: 'Teacher4', email:'qwertyzxc@gmai.com', contact:'9874563210', department: 'Electronics & Computer Engineering', status: 'online'},
                                    {id: 'sdzfa',name: 'Teacher5', email:'qwertyzxc@gmai.com', contact:'9874563210', department: 'Electronics & Computer Engineering', status: 'online'}]})
        // this.teacherService.getTeachers().then(data => this.setState({ teachers: data }));
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
        console.log(this.state.teacher)
        if (this.state.teacher.name.trim()) {
            let teachers = [...this.state.teachers];
            let teacher = {...this.state.teacher};
            if (this.state.teacher.id) {
                const index = this.findIndexById(this.state.teacher.id);

                teachers[index] = teacher;
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Teacher Updated', life: 3000 });
            }
            else {
                teacher.id = this.createId();
                teacher.image = 'teacher-placeholder.svg';
                teachers.push(teacher);
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Teacher Created', life: 3000 });
            }

            state = {
                ...state,
                teachers,
                teacherDialog: false,
                teacher: this.emptyTeacher
            };
        }

        this.setState(state);
    }

    editTeacher(teacher) {
        this.setState({
            teacher: { ...teacher },
            teacherDialog: true
        });
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

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.teachers.length; i++) {
            if (this.state.teachers[i].id === id) {
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

    onCityChange(e) { this.setState({teacher: {...this.state.teacher, department: e.value.department}})}

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
                <Button icon='pi pi-briefcase' className="p-button-rounded p-button-info p-mr-2"/>
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

        return (
            <div className="datatable-crud-demo">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <Toolbar className="p-mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>
                    {/* selection={this.state.selectedTeachers} onSelectionChange={(e) => this.setState({ selectedTeachers: e.value })} */}
                    <DataTable ref={(el) => this.dt = el} value={this.state.teachers}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} teachers"
                        globalFilter={this.state.globalFilter}
                        header={header}>

                        {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="email" header="Email" ></Column>
                        <Column field="contact" header="Phone No"  ></Column>
                        <Column field="department" header="Department" ></Column>
                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.teacherDialog} style={{ width: '450px' }} header="Teacher Details" modal className="p-fluid" footer={teacherDialogFooter} onHide={this.hideDialog}>
                    {/* {this.state.teacher.image && <img src={`showcase/demo/images/teacher/${this.state.teacher.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={this.state.teacher.image} className="teacher-image" />} */}
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <InputText id="name" value={this.state.teacher.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.teacher.name })} />
                        {this.state.submitted && !this.state.teacher.name && <small className="p-invalid">Name is required.</small>}
                    </div>
                     <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" value={this.state.teacher.email} onChange={(e) => this.onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.teacher.email })} />
                        {this.state.submitted && !this.state.teacher.email && <small className="p-invalid">Email is required.</small>}
                    </div>
                     <div className="p-field">
                        <label htmlFor="comtact">Phone No:</label>
                        <InputText id="contact" value={this.state.teacher.contact} onChange={(e) => this.onInputChange(e, 'contact')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.teacher.contact })} />
                        {this.state.submitted && !this.state.teacher.contact && <small className="p-invalid">Contact is required.</small>}
                    </div>
                    <div>
                        <label htmlFor="department">Department</label>
                        <Dropdown value={{department: this.state.teacher.department}} options={this.departments} onChange={this.onCityChange} optionLabel="department" required placeholder="Select a Department"/>
                        {this.state.submitted && !this.state.teacher.department && <small className="p-invalid">Department is required.</small>}
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
            </div>
        );
    }
}
                
export default AdminMain;
