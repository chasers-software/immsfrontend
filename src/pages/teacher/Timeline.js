import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/teacher';
import "./Timeline.css";

import Inbox from './InboxArea';
import Post from './PostArea';

class Timeline extends React.Component {
    componentDidMount(){        
        if (this.props.activeClass === null)  this.props.setInfoBox({summary:"Info Message", detail: 'No Active Class Selected!!!'});
    }
    render() {
    return (
        <Fragment>
            {this.props.infoBox ? <Redirect to='/'/> : null}
        <div className="p-fluid wholeStyle">
           <div className="p-grid p-lg-12">
               <div className="p-col-7">
                   <Post/>
                </div>
            <div className="p-col-4 p-offset-1 p-shadow-2">
                <div className="header">
                    Inbox
                </div>
                <Inbox/>
            </div>

            </div>
        
        </div>
        </Fragment>
    );
    }
}

const mapStateToProps = state => {
    return {
        activeClass: state.teacher.activeClass,
        infoBox: state.teacher.infoBox
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setInfoBox: (value) => dispatch( actions.setInfoBox(value) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps)( Timeline );
