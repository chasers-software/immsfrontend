import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import MainDashStudent from './StudentMain';
import DataTableView from './ViewTable';
import * as actions from '../../store/actions/student';
// import * as uris from '../../store/uris';

class Student extends Component{
	// constructor(){
	// 	super();
	// }
	componentDidMount(){
        this.props.resetTeacherState();
        this.props.setSems({value: 1}, {value: 2}, {value: 3}, {value: 4},
                            {value: 5}, {value: 6}, {value: 7}, {value: 8})
        // fetch(uris.FETCH_CLASS_LIST+this.props.username, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer '+this.props.token
        //     }
        // })
        //     .then(res => res.json())
        //     .then(res => this.props.onSetClass(res.data))
        //     .catch(err => console.log("Teacher err", err))
	}
	
	render(){
		return (
			<div className="layout-main">
            	<Route path="/" exact component={MainDashStudent}/>
            	<Route path="/marksview" exact component={DataTableView}/>
      		</div>
		)
	}
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        username: state.auth.username,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetSem: (values) => dispatch(actions.setSems(values)),
        resetStudentState: () => dispatch(actions.resetStudentState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);