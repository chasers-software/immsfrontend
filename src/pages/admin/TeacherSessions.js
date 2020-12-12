import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from 'primereact/progressspinner';
import * as uris from '../../store/uris';
import * as actions from '../../store/actions/admin';
// import { Button } from 'primereact/button';
// import { Dropdown } from 'primereact/dropdown';
// import { Card } from "primereact/card";
// import { Button } from "primereact/button";
import './TeacherSessions.css';

class TeacherSessions extends Component {
    constructor(){
        super();
        this.state = {
            redirect: null
        }
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

    render (){
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
                <div className="p-lg-12 p-d-flex p-flex-wrap p-flex-column p-flex-lg-row">
                {this.props.teacherClassValues.length === 0 ? null : this.props.teacherClassValues[this.props.teacherIndex].data.map((data, index) => {
                                return (<Card key={index} title={data.subject_code} subTitle={data.title} style={{ width: "20em" }}
                                            className="p-shadow-8 p-mb-3 p-mr-3" footer={<Button style={{width: "100%"}} label="Remove"
                                            onClick={{}}/>}>
                                          <span style={{margin: "0 1em 0 0"}} className="p-tag p-badge-secondary p-tag-rounded">{data.section_code.slice(0,-2)}</span>
                                          <span className="p-tag p-badge-secondary p-tag-rounded">{data.section_code.slice(-2,-1)}</span>
                                          <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
                                        </Card>)})}
                </div>
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
        setInfoBox: (value) => dispatch( actions.setInfoBox(value) )
    };
};
  
export default connect( mapStateToProps, mapDispatchToProps )( TeacherSessions );
