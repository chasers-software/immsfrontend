import React from 'react';

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
  
  
 
