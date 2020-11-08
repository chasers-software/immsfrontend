import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import * as actions from '../../store/actions/student';
// import {setAuthRedirect} from '../../store/actions/auth';
import { ProgressSpinner } from 'primereact/progressspinner';
import "primeflex/primeflex.css";

// const footer = (<Button style={{width: "100%"}} label="View"/>);

class MainDashStudent extends React.Component {
    constructor(){
        super();
        this.state = {
            redirect: null
        }
    }
  componentDidMount(){
    if (this.props.infoBox) {
      this.toast.show({severity: 'info', summary: this.props.infoBox.summary, detail: this.props.infoBox.detail})
    }
    this.props.setInfoBoxNULL();
  }

  onCardSelectHandler(data){
    this.props.selectCard(data.batch+data.subCode+data.group, data.sem, data.group);
    this.setState({redirect: <Redirect to='/marksview'/>})
    // this.props.setRedirect();
  }

  render() {
    return (<>
        <h3>Choose your subject and see Student details.</h3>
        <Toast ref={(el) => this.toast = el} />
        {this.props.loading ? <div style={{paddingTop: '50px'}}><ProgressSpinner style={{width: '100%'}}/></div> : 
          <div className="p-lg-12 p-d-flex p-flex-column p-flex-lg-row">
          {this.props.sems.map((data, index) => {
                                return (<Card key={index} title={"Semester Card"} subTitle={"Semester No."} style={{ width: "20em" }}
                                            className="p-shadow-8 p-mb-2 p-mr-3" footer={<Button style={{width: "100%"}} label="View"
                                            onClick={() => this.onCardSelectHandler(data)}/>}>
                                          <span style={{margin: "0 1em 0 0"}} className="p-tag p-badge-secondary p-tag-rounded">{data.value}</span>
                                          {/* <span className="p-tag p-badge-secondary p-tag-rounded">{data.group}</span> */}
                                          <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
                                        </Card>)})}
        </div>}
      {this.state.redirect}
      </>
    );
  }
};

const mapStateToProps = state => {
  return {
    sems: state.student.sems,
    infoBox: state.teacher.infoBox,
    redirect: state.auth.redirect,
    loading: state.student.loading    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectCard: (sem) => dispatch(actions.setActiveSem(sem)),
    setInfoBoxNULL: () => dispatch( actions.setInfoBox(null) ),
    // setRedirect: () => dispatch(setAuthRedirect(<Redirect to='/marksview'/>))
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( MainDashStudent );
