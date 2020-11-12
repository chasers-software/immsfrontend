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

// const footer = (<Button style={{width: "100%"}} label="View"/>);

class MainDashTeacher extends React.Component {
  componentDidMount(){
    if (this.props.infoBox) {
      this.toast.show({severity: 'info', summary: this.props.infoBox.summary, detail: this.props.infoBox.detail})
    }
    this.props.setInfoBoxNULL();
  }

  onCardSelectHandler(data){
    this.props.selectCard(data.batch+data.subCode+data.group, data.sem, data.group);
    this.props.setRedirect();
  }

  render() {
      // const header = (
      //   <img
      //     alt="Card"
      //     width="10%"
      //     src="showcase/demo/images/usercard.png"
      //     onError={(e) =>
      //       (e.target.src =
      //         "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
      //     }
      //   />
      // );
      // {
      //   "batch": "073BCE",
      //   "subCode": "SH603",
      //   "group": "AB",
      //   "subName": "Numerical Methods",
      //   "sem": "3/1",
      //   "sems": "III/I"
      // }
      // let assignedCourses = [
      //   { title:"PUC CT652", subTitle:"Database Management System",section:"074BCT"},
      //   { title:"PUC CT652", subTitle:"Database Management System",section:"074BCT"},
      //   { title:"PUC CT652", subTitle:"Database Management System",section:"074BCT"},
      //   { title:"PUC CT652", subTitle:"Database Management System",section:"074BCT"},
      // ]
    return (<>
        <h3>Choose your subject and see Student details.</h3>
        <Toast ref={(el) => this.toast = el} />
        {this.props.loading ? <div style={{paddingTop: '50px'}}><ProgressSpinner style={{width: '100%'}}/></div> : 
          <div className="p-lg-12 p-d-flex p-flex-wrap p-flex-column p-flex-lg-row">
          {this.props.classes.map((data, index) => {
                                return (<Card key={index} title={data.subCode} subTitle={data.subName} style={{ width: "20em" }}
                                            className="p-shadow-8 p-mb-2 p-mr-3" footer={<Button style={{width: "100%"}} label="View"
                                            onClick={() => this.onCardSelectHandler(data)}/>}>
                                          <span style={{margin: "0 1em 0 0"}} className="p-tag p-badge-secondary p-tag-rounded">{data.batch}</span>
                                          <span className="p-tag p-badge-secondary p-tag-rounded">{data.group}</span>
                                          <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
                                        </Card>)})}
          {/* {{{<CourseCard title="PUC CT652" subTitle="Database Management System" section="074BCT"/>
          <Card
            title="PUC CT652"
            subTitle="Database Management System"
            style={{ width: "20em" }}
            className="p-mb-2 p-mr-3"
            footer={footer}
          >


            <span className="p-tag p-badge-secondary p-tag-rounded">074BCT</span>
          
            <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
          </Card>
          <Card
            title="PUC CT652"
            subTitle="Database Management System"
            style={{ width: "20em" }}
            className="p-mb-2 p-mr-3"
            footer={footer}
          >


            <span className="p-tag p-badge-secondary p-tag-rounded">074BCT</span>
            <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
          </Card>
          <Card
            title="PUC CT652"
            subTitle="Database Management System"
            style={{ width: "20em" }}
            className="p-mb-2 p-mr-3"
            footer={footer}
          >
          

            <span className="p-tag p-badge-secondary p-tag-rounded">074BCT</span>
            <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
          </Card>}}} */}

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
    selectCard: (Class, sem, group) => dispatch(actions.setActiveClass(Class, sem, group)),
    setInfoBoxNULL: () => dispatch( actions.setInfoBox(null) ),
    setRedirect: () => dispatch(setAuthRedirect(<Redirect to='/marksview'/>))
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( MainDashTeacher );
