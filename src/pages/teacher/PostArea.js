import React, {Fragment} from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { connect } from 'react-redux';
import * as uris from '../../store/uris';

class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            value2: ''
        }
        this.onPostSend = this.onPostSend.bind(this);
    }
    componentDidMount(){
        fetch(uris.FETCH_POSTS+'?person_id='+this.props.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(res => res.json())
            .then(res => {console.log(res);this.setState({data: res.data})})
            .catch(err => console.log(err));
    }

    onPostSend(){
        fetch(uris.SUBMIT_POST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                section_id: this.props.activeSection[this.props.activeIndex].section_id,
                person_id : this.props.username,
                content: this.state.value2
            })
        })
            .then(res => res.json())
            .then(res => {this.toast.show({severity: 'info', summary: 'Info"', detail: 'Post Added Successfully!!!'});
            fetch(uris.FETCH_POSTS+'?person_id='+this.props.username, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(res => res.json())
                .then(res => {console.log(res);this.setState({data: res.data})})
                .catch(err => console.log(err));
        })
            .catch(err => console.log(err));
    }
      render(){
          return(
              <div>
              <Toast ref={(el) => this.toast = el} />
                     <div className="p-grid p-col p-ml-2 p-mt-4 p-shadow-2 p-mb-4 noticeBOX">
                        <div className="p-col-1">
                            <img src="https://i.imgur.com/hLwNrtw.jpg" alt=""/>
                        </div>
             
                        <div className="fixInput p-col">
                            <InputTextarea className="p-inputtextarea " value={this.state.value2} onChange={(e) => this.setState({value2: e.target.value})}  rows={2} cols={30}  autoResize />
                        </div>
                        <div className="p-col-2">
                            <Button label="SEND"  onClick={this.onPostSend}/>
                        </div>               
                    </div>     
       
                    {this.state.data ? this.state.data.map((dat, index) => {
          return (<Fragment key={index}>
              <div className="p-col">
                    <div className="p-row p-p-2 fixPadd">
                            <img src="https://i.imgur.com/hLwNrtw.jpg" alt="" width="20px"/> 
                            {dat.full_name}<div className="fixedSUB"></div>
                    </div>
                    <div className="p-row p-p-2">
                        {dat.content}</div>
                </div>
                {/* <div className="p-col-1">
                    3min Ago
                </div> */}
          </Fragment>
          );
      }) : null}
              </div>
          );
      }
  }

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    activeSection: state.teacher.classes,
    activeIndex: state.teacher.activeClassStudentValuesIndex 
  };
};

export default connect( mapStateToProps, null )( Post );
  
  
 
