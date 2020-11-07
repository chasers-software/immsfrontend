import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import {setAuthRedirect} from '../../store/actions/auth';
import * as uris from '../../store/uris';
import * as actions from '../../store/actions/teacher';
import './DataTable.css';

class DataTableView extends Component {
    constructor(){
        super();
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        this.props.setRedirectNULL();
        this.fetchProductData('data');
        let i;
        for(i=0;i<this.props.classStudentValues.length;i++){
            if ((this.props.classStudentValues[i].classId === this.props.activeClass) &&
                (this.props.classStudentValues[i].sem === this.props.activeSem) &&
                (this.props.classStudentValues[i].group === this.props.activeGroup)){
                this.props.setActiveStudentIndex(i);
                break;
            }
        }
        //fetch(`http://localhost:3000/api/record/class?class=${this.props.tutorClass}&subjectCode=${this.props.subjectCode}&sem=1`)
        if (i === this.props.classStudentValues.length && this.props.activeClass !== null){
            // let dat = this.props.classes.find((cls) => this.props.activeClass === cls.batch+cls.subCode+cls.group);
            // let sem = ((parseInt(this.props.activeSem[0])-1)*2+parseInt(this.props.activeSem[2])).toString();
            fetch(uris.FETCH_CLASS_STUDENT_lIST+'073BCESH603CD', { // TODO: change the hardcoded student list fetch, this.props.activeClass
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(res => res.json())
                .then(res => {
                    this.props.setClassStudentValues({classId:this.props.activeClass, sem: this.props.activeSem, group: this.props.activeGroup, data: res.data, fm: res.fm});
                    this.props.setActiveStudentIndex(this.props.classStudentValues.length-1);
                })
                .catch(err => console.log(err));
        }
    }

    fetchProductData(productStateKey) {
        this.setState({ data: [{"RollNo":"001", "Name":"Ashique Barma", "Assessment":10, "Practical":45},
                                {"RollNo":"001", "Name":"Ashique Barma", "Assessment":10, "Practical":45},
                                {"RollNo":"001", "Name":"Ashique Barma", "Assessment":10, "Practical":45}]})
    }

    render() {
        let recordDatas = this.props.classStudentValues[this.props.classIndex];
        return (
            <Fragment>
                {recordDatas ? (
                <div className="datatable-editing">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <h3>Marks Summary View : Assessment and Practical Marks are NOT Editable</h3>
                    <DataTable value={recordDatas.data} header="Data">
                        <Column field="username" header="RollNo"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="test" header="Assessment"></Column>
                        <Column field="practical" header="Practical"></Column>
                    </DataTable>
                </div>
                </div>
            ) : null}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeClass: state.teacher.activeClass,
        classStudentValues: state.teacher.classStudentValues,
        classIndex: state.teacher.activeClassStudentValuesIndex,
        activeSem: state.teacher.activeSem,
        activeGroup: state.teacher.activeGroup,        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setRedirectNULL: () => dispatch(setAuthRedirect(null)),
        setClassStudentValues: (values) => dispatch(actions.setClassStudentValues(values)),
        setActiveStudentIndex: (value) => dispatch(actions.setActiveStudentIndex(value))
    };
};
  
export default connect( mapStateToProps, mapDispatchToProps )( DataTableView );
