import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import { Toast } from 'primereact/toast';
import AdminMain from './AdminMain';
import TeacherSessions from './TeacherSessions';
import AdminDashboard from './admindashboard';
import * as actions from '../../store/actions/admin';
import * as uris from '../../store/uris';

class Admin extends Component{
	componentDidMount(){
        fetch(uris.FETCH_TEACHER_LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer '+this.props.token
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    this.props.onSetTeachers(res.data)
                } else {
                    this.toast.show({severity: 'error', summary: 'Teacher Fetch Failed', detail: res.message});
                }
            })
            .catch(err => console.log("Teacher err", err))
	}
	
	render(){
		return (
            <Fragment>
            <Toast style={{zIndex: 10000}} ref={(el) => this.toast = el} />
			<div className="layout-main">
            	<Route path="/" exact component={AdminMain}/>
            	<Route path="/teachersessions" exact component={TeacherSessions}/>
            	<Route path="/admindashboard" exact component={AdminDashboard}/>
            	{/* <Route path="/marksview" exact component={DataTableView}/>
            	<Route path="/marksentry" exact component={DataTableEdit}/> */}
      		</div>
            </Fragment>
		)
	}
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        username: state.auth.username
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetTeachers: (values) => dispatch(actions.setTeachers(values))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
