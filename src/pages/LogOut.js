import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as actions from '../store/actions/auth';
import { resetTeacherState } from '../store/actions/teacher';

class LogOut extends Component{
    componentDidMount(){
        this.props.onLogOut();
    }

    render(){
        return <Redirect to='/'/>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetTeacherState: () => dispatch(resetTeacherState()),
        onLogOut: () => dispatch(actions.logout())
    }
};

export default connect(null, mapDispatchToProps)(LogOut);