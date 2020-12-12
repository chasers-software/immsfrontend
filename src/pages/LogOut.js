import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as actions from '../store/actions/auth';
import { resetStudentState } from '../store/actions/student';
import { resetTeacherState } from '../store/actions/teacher';
import { resetAdminState } from '../store/actions/admin';

class LogOut extends Component{
    componentDidMount(){
        this.props.resetStudent();
        this.props.resetTeacher();
        this.props.resetAdmin();
        this.props.onLogOut();
    }

    render(){
        return <Redirect to='/'/>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetTeacherState: () => dispatch(resetTeacherState()),
        resetStudent: () => dispatch(resetStudentState()),
        resetTeacher: () => dispatch(resetTeacherState()),
        resetAdmin: () => dispatch(resetAdminState()),
        onLogOut: () => dispatch(actions.logout())
    }
};

export default connect(null, mapDispatchToProps)(LogOut);
