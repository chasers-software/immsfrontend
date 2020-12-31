import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import * as actions from '../../store/actions/teacher';
import {setAuthRedirect} from '../../store/actions/auth';
import { ProgressSpinner } from 'primereact/progressspinner';
import "primeflex/primeflex.css";

class MainDashTeacher extends React.Component {
  componentDidMount(){
    if (this.props.infoBox) {
      this.toast.show({severity: 'info', summary: this.props.infoBox.summary, detail: this.props.infoBox.detail})
    }
    this.props.setInfoBoxNULL();
  }

  onCardSelectHandler(data){
    this.props.selectCard(data.lecture_id);
    this.props.setSectionSubject([data.section_code, data.subject_code, data.theory_fm, data.practical_fm]);
    this.props.setRedirect();
  }

  render() {
      // ]
    return (<>
        <h3>Choose your subject and see Student details.</h3>
        <Toast style={{zIndex: 10000}} ref={(el) => this.toast = el} />
        {this.props.loading ? <div style={{paddingTop: '50px'}}><ProgressSpinner style={{width: '100%'}}/></div> : 
          <div className="p-lg-12 p-d-flex p-flex-wrap p-flex-column p-flex-lg-row">
          {this.props.classes.map((data, index) => {
                                return (<Card key={index} title={data.subject_code} subTitle={data.title} style={{ width: "20em" }}
                                            className="p-shadow-8 p-mb-3 p-mr-3" footer={<Button style={{width: "100%"}} label="View"
                                            onClick={() => this.onCardSelectHandler(data)}/>}>
                                          <span style={{margin: "0 1em 0 0"}} className="p-tag p-badge-secondary p-tag-rounded">{data.section_code.slice(0,-2)}</span>
                                          <span className="p-tag p-badge-secondary p-tag-rounded">{data.section_code.slice(-2,)}</span>
                                          <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
                                        </Card>)})}
        </div>}
      {this.props.redirect}
      </>
    );
  }
};

const mapStateToProps = state => {
  return {
    classes: state.teacher.classes,
    infoBox: state.teacher.infoBox,
    redirect: state.auth.redirect,
    loading: state.teacher.loading    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectCard: (Class) => dispatch(actions.setActiveClass(Class)),
    setSectionSubject: (value) => dispatch(actions.setActiveSectionSubject(value)),
    setInfoBoxNULL: () => dispatch( actions.setInfoBox(null) ),
    setRedirect: () => dispatch(setAuthRedirect(<Redirect to='/marksview'/>))
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( MainDashTeacher );
