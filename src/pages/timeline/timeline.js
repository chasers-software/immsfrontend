import React from 'react';
import "./timeline.css";

import Inbox from './InboxArea';
import Post from './postArea';

export class Timeline extends React.Component {

 
  render() {
    return (
        <div className=" p-fluid wholeStyle">
           <div className="p-grid p-lg-12">
               <div className="p-col-8">
                   <Post/>
                </div>
            <div className="p-col-4 p-shadow-2">
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