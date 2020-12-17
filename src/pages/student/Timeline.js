import React from 'react';
import "./Timeline.css";

import Inbox from './InboxArea';
import Post from './PostArea';

class Timeline extends React.Component {
  render() {
    return (
        <div className=" p-fluid wholeStyle">
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
        
    );
    }
}
export default Timeline;
