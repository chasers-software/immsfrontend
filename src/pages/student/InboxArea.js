import React from 'react';
import { connect } from 'react-redux';
import * as uris from '../../store/uris';

class Inbox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        fetch(uris.FETCH_NOTIFICATIONS+'?person_id='+this.props.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(res => res.json())
            .then(res => {this.setState({data: res.data})})
            .catch(err => console.log(err));
    }
      render(){
          return(
              
  <div className="p-grid styleInbox p-mt-4 ">
      {this.state.data.map((dat, index) => {
          return (
            <div key={index} className="p-col-12 itstyle">
            <img src="https://i.imgur.com/IqICwKK.jpg" width="45px" height="45px" alt=""/>                    
             <div className="inboxtext">{dat.message}</div>
            {/* <div className="timeago"> 3min Ago</div> */}
        </div>
          );
      })}
  </div> 
          );
      }
  }

const mapStateToProps = state => {
  return {
    username: state.auth.username   
  };
};


export default connect( mapStateToProps, null )( Inbox );
  