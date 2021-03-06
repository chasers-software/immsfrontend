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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './DataTable.css';
import { rangeContainsMarker } from '@fullcalendar/core';
const numberToText = require('number-to-text')
require('number-to-text/converters/en-us');

class DataTableView extends Component {
    constructor(props){
        super(props);
        this.exportCSV = this.exportCSV.bind(this);
        this.exportPdf = this.exportPdf.bind(this);
        this.exportPdfGroups = this.exportPdfGroups.bind(this);
        this.findSubject = this.findSubject.bind(this);
        this.cols = [
            {field:"username", style:{width: '150px'}, header:"RollNo"},
            {field:"full_name", style:{width: '350px'}, header:"Name"},
            {field:"theory_marks", style:{width: '150px'}, header:"Assessment\rIn Figure"},
            {field:"theorymarks_inwords", style:{width: '150px'}, header:"Assesment\rIn Words"},
            {field:"remarks", style:{width: '150px'}, header:"Remarks"}
        ];
        this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
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
        if (i === this.props.classStudentValues.length && this.props.activeClass !== null){
            fetch(uris.FETCH_CLASS_STUDENT_LIST+this.props.activeClass, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(res => res.json())
                .then(res => {
                    if (res.status === 'success') {
                        let temp = [...res.data];
                        for (let i=0; i<temp.length; i++){
                            if (temp[i].theory_marks < 8 ) temp[i].remarks = 'NQ';
                            else temp[i].remarks="Regular";
                            
                            let pair={'theorymarks_inwords': numberToText.convertToText(temp[i].theory_marks)};
                            temp[i]={...temp[i],...pair};
                        }
                        this.props.setClassStudentValues({classId:this.props.activeClass, data: temp});
                        this.props.setActiveStudentIndex(this.props.classStudentValues.length-1);
                    } else {
                        this.toast.show({severity: 'error', summary: 'Section Marks Fetch Failed', detail: res.message});
                    }
                })
                .catch(err => console.log(err));
        }
    }

    exportCSV() {
        this.dt.exportCSV();
    }
    findSubject(shortForm){
        switch(shortForm){
            case "BCT":
                return "Computer Enginnering";
            case "BEX":
                return "Electronics and Computer Engineering";
            case  "BEL":
                return "Electrical Engineering";
            case "BCE":
                return "Civil Engineering";
            case "BME":
                return "Mechanical Engineering";
            case "BAE":
                return "Architectural Engineering";
            default:
                return "Engineering";
        }
    }
    
    exportPdf(doc,isSecond){
        let group='';
        let recordDatas = this.props.classStudentValues[this.props.classIndex];
        doc.setFontSize(12);
        doc.text("TRIBHUVAN UNIVERSITY\rINSTITUTE OF ENGINEERING\rPulchowk Campus\rBachelors in "+ this.findSubject(this.props.sectionSubject[0].substring(3,6)),105,10,{align:'center'});
        if (isSecond){
            group=this.props.sectionSubject[0][7];
            recordDatas=recordDatas.data.slice(24);
        }
        else{
           group=this.props.sectionSubject[0][6];
           recordDatas=recordDatas.data.slice(0,24);
        }
        doc.text("Group " + group,82,38,{align: 'center'});
        doc.text("Batch 2" + this.props.sectionSubject[0].substring(0,3),130,38,{align: 'center'});
        doc.text("FM: " + this.props.sectionSubject[2],20,42,{align: 'center'});
        doc.text("Code: " + this.props.sectionSubject[1],190,42,{align:'right'});
        doc.text("PM: " + 0.4*this.props.sectionSubject[2],19,47,{align: 'center'});
        doc.text("Subject: "+this.props.sectionSubject[4],73,47,{algin:'center'});
       
        doc.autoTable(this.exportColumns, recordDatas, {
            theme: 'grid',
            styles: {halign:'center', fontSize: 10, fillColor:[255,255,255] , textColor: [0,0,0], tableLineWidth: 4, tableLineColor:[0,0,0]},
            showHead: 'firstPage',
            startY: 52,
        });
        let finalY=doc.lastAutoTable.finalY;
        console.log(finalY);
        doc.text("Date:",20,finalY+10);
        doc.text("Name of Examiner:",75,finalY+10);
        doc.text("Signature:",145,finalY+10 )
        doc.save(`Group-${group}-internalMarks.pdf`);
    }

    exportPdfGroups()
    {
        const group1 = new jsPDF({lineHeight:1.5});
        let isSecond=false
        this.exportPdf(group1,isSecond);
        const group2 = new jsPDF({lineHeight:1.5});
        isSecond=true;
        this.exportPdf(group2,isSecond);
    }


    render() {
        let recordDatas = this.props.classStudentValues[this.props.classIndex];
        console.log(recordDatas);
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
                            <div className="p-col p-offset-8">
                                <Button label="Export CSV" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
                                <Button label="Export PDF" icon="pi pi-upload" className="p-button-help" onClick={this.exportPdfGroups} />
                            </div>
                
                            <DataTable ref={(el) => this.dt = el}  value={recordDatas.data} header={"Student Data for Section "+this.props.sectionSubject[0]+
                                        " of Subject with Subject Code : "+this.props.sectionSubject[1]+" ------ TheoryFM: "+this.props.sectionSubject[2]}>
                                {this.cols.map((col, index) => <Column key={index} field={col.field} style={col.style} header={col.header} sortable/>)}
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
