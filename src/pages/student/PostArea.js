import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import * as uris from '../../store/uris';
import "../../App.css";
class Post extends React.Component{
         constructor(props){
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount(){
        fetch(uris.FETCH_POSTS+'?person_id='+this.props.username, {
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
            <div className=" p-grid  p-ml-2  p-pt-1 p-shadow-2  ">    
            {this.state.data.map((dat, index) => {
          return (<Fragment key={index}>
              <div className="p-col-12">
                    <div className="p-row p-p-2 fixPadd">
                            <img src="https://i.imgur.com/hLwNrtw.jpg" alt="" width="20px"/> 
                            {dat.full_name}<div className="fixedSUB">{dat.subject}</div>
                    </div>
                    <div className="p-row p-p-2">
                        {dat.content}</div>
                </div>
          </Fragment>
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

export default connect( mapStateToProps, null )( Post );
