import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import MainDashTeacher from './TeacherMain';
import DataTableView from './ViewTable';
import DataTableEdit from './EditTable';
import BarChart from './BarChart';
import Timeline from './Timeline';
import * as actions from '../../store/actions/teacher';
import * as uris from '../../store/uris';

class Teacher extends Component{
	// constructor(){
	// 	super();
	// }
	componentDidMount(){
        // this.props.resetTeacherState();
        fetch(uris.FETCH_CLASS_LIST+'?person_id='+this.props.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer '+this.props.token
            }
        })
            .then(res => res.json())
            .then(res => this.props.onSetClass(res.data))
            .catch(err => console.log("Teacher err", err))
	}
	
	render(){
		return (
			<div className="layout-main">
            	<Route path="/" exact component={Timeline}/>
            	<Route path="/dashboard" exact component={MainDashTeacher}/>
            	<Route path="/marksview" exact component={DataTableView}/>
            	<Route path="/marksentry" exact component={DataTableEdit}/>
            	<Route path="/statistics" exact component={BarChart}/>
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
        onSetClass: (values) => dispatch(actions.setClasses(values)),
        // resetTeacherState: () => dispatch(actions.resetTeacherState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
