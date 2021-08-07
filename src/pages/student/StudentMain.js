import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import * as actions from '../../store/actions/student';
import { ProgressSpinner } from 'primereact/progressspinner';
import * as uris from '../../store/uris';
import "primeflex/primeflex.css";

class MainDashStudent extends React.Component {
  constructor(){
      super();
      this.state = {
          redirect: null,
          deadline: ''
      }
  }

  componentDidMount(){
    if (this.props.infoBox) {
      this.toast.show({severity: 'info', summary: this.props.infoBox.summary, detail: this.props.infoBox.detail})
    }
    this.props.setInfoBoxNULL();

    fetch(uris.POST_DEADLINE, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }})
    .then(res => res.json())
    .then(res => {
      if (res.status === 'success') {
          this.setState({deadline: res.deadline.substring(0, 10)})
      } else {
          this.toast.show({severity: 'error', summary: 'Deadline Fetch Failed', detail: res.message});
      }
    })
    .catch(err => console.log(err))
  }

  onCardSelectHandler(index){
		this.props.selectCard(index);
		this.setState({redirect: <Redirect to='/marksview'/>});
  }

  render() {
    return (<>
        <div className='p-grid'>
          <div className='p-col-9'>
            <h3>Choose your semester card and see your internal marks.</h3>
          </div>
          <div className='p-col-3'>
          <h3 style={{color: 'red'}}>Marks Submission Till : {this.state.deadline}</h3>
          </div>
        </div>
        <Toast style={{zIndex: 10000}} ref={(el) => this.toast = el} />
        {this.props.loading ? <div style={{paddingTop: '50px'}}><ProgressSpinner style={{width: '100%'}}/></div> : 
          <div className="p-lg-12 p-d-flex p-flex-wrap p-flex-column p-flex-lg-row">
          {this.props.sems.map((data, index) => {
                                return (<Card key={index} title={"Semester Card"} subTitle={"Semester No."} style={{ width: "20em" }}
                                            className="p-shadow-8 p-mb-3 p-mr-3" footer={<Button style={{width: "100%"}} label="View"
                                            onClick={() => this.onCardSelectHandler(index+1)}/>}>
                                          <span style={{margin: "0 1em 0 0"}} className="p-tag p-badge-secondary p-tag-rounded">{data.value}</span>
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
    infoBox: state.student.infoBox,
    loading: state.student.loading    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectCard: (sem) => dispatch(actions.setActiveSem(sem)),
    setInfoBoxNULL: () => dispatch( actions.setInfoBox(null) ),
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( MainDashStudent );
