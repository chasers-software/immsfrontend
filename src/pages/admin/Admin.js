import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import AdminMain from './AdminMain';
import TeacherSessions from './TeacherSessions';
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
            .then(res => {console.log(res);
                        this.props.onSetTeachers(res.data)})
            .catch(err => console.log("Teacher err", err))
	}
	
	render(){
		return (
			<div className="layout-main">
            	<Route path="/" exact component={AdminMain}/>
            	<Route path="/teachersessions" exact component={TeacherSessions}/>
            	{/* <Route path="/marksview" exact component={DataTableView}/>
            	<Route path="/marksentry" exact component={DataTableEdit}/> */}
      		</div>
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
