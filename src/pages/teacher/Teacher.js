import React, {Component} from 'react';
import { Route } from "react-router-dom";
import MainDashTeacher from './TeacherMain';
import { DataTableView } from './ViewTable';
import DataTableEdit from './EditTable';

class Teacher extends Component{
	// constructor(){
	// 	super();
	// }
	render(){
		return (
			<div className="layout-main">
            	<Route path="/" exact component={MainDashTeacher}/>
            	<Route path="/marksview" exact component={DataTableView}/>
            	<Route path="/marksentry" exact component={DataTableEdit}/>
      		</div>
		)
	}
}

export default Teacher;
