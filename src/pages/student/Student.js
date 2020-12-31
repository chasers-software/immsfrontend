import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import MainDashStudent from './StudentMain';
import DataTableView from './ViewTable';
import Timeline from './Timeline';
import * as actions from '../../store/actions/student';

class Student extends Component{
	componentDidMount(){
        this.props.resetStudentState();
        this.props.setSems([{value: 1}, {value: 2}, {value: 3}, {value: 4},
                            {value: 5}, {value: 6}, {value: 7}, {value: 8}])
	}
	
	render(){
		return (
			<div className="layout-main">
            	<Route path="/" exact component={MainDashStudent}/>
            	<Route path="/marksview" exact component={DataTableView}/>
            	<Route path="/studenttimeline" exact component={Timeline}/>
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
        setSems: (values) => dispatch(actions.setSems(values)),
        resetStudentState: () => dispatch(actions.resetStudentState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
