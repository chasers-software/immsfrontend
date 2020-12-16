import React from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

class Post extends React.Component{
         constructor(props){
        super(props);
        this.state = {
            value1: '',
            value2: ''
        };
    }
      render(){
          return(
              <div>
                     <div className="p-grid p-col p-ml-2 p-mt-4 p-shadow-2 p-mb-4 noticeBOX">
                        <div className="p-col-1">
                            <img src="https://i.imgur.com/hLwNrtw.jpg" alt=""/>
                        </div>
             
                        <div className="fixInput p-col">
                            <InputTextarea className="p-inputtextarea " value={this.state.value2} onChange={(e) => this.setState({value2: e.target.value})}  rows={2} cols={30}  autoResize />
                        </div>
                        <div className="p-col-2">
                            <Button label="SEND"  />
                        </div>               
                    </div>     
       
            <div className="postView p-grid  p-ml-2  p-pt-1 p-shadow-2  ">    
                <div className="p-col">
                    <div className="p-row p-p-2 fixPadd">
                            <img src="https://i.imgur.com/hLwNrtw.jpg" alt="" width="20px"/> 
                            Aman Shakya <div className="fixedSUB">DBMS</div>
                    </div>
                    <div className="p-row p-p-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
                <div className="p-col-1">
                    3min Ago
                </div>
            </div>
              </div>
          );
      }
  }

export default Post;
  
  
 
