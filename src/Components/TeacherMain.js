import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "primeflex/primeflex.css";

export class MainDashTeacher extends React.Component {
  render() {
      const header = (
        <img
          alt="Card"
          width="10%"
          src="showcase/demo/images/usercard.png"
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
        />
      );
      const footer = (
        <span>
          <Button label="View"  />
         
        </span>
      );
    return (<>
        <h3>Choose your subject and see Student details.</h3>
      <div className="p-lg-12   p-d-flex p-flex-column p-flex-lg-row ">
        <Card
          title="PUC CT652"
          subTitle="Database Management System"
          style={{ width: "20em" }}
          className="p-shadow-8 p-mb-2 p-mr-3"
          footer={footer}
        >
         
          <span className="p-tag p-badge-secondary p-tag-rounded">074BCT</span>
          <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
        </Card>
        <Card
          title="PUC CT652"
          subTitle="Database Management System"
          style={{ width: "20em" }}
          className="p-mb-2 p-mr-3"
          footer={footer}
        >
          

          <span className="p-tag p-badge-secondary p-tag-rounded">074BCT</span>
        
          <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
        </Card>
        <Card
          title="PUC CT652"
          subTitle="Database Management System"
          style={{ width: "20em" }}
          className="p-mb-2 p-mr-3"
          footer={footer}
        >
          

          <span className="p-tag p-badge-secondary p-tag-rounded">074BCT</span>
          <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
        </Card>
        <Card
          title="PUC CT652"
          subTitle="Database Management System"
          style={{ width: "20em" }}
          className="p-mb-2 p-mr-3"
          footer={footer}
        >
         

          <span className="p-tag p-badge-secondary p-tag-rounded">074BCT</span>
          <p className="p-m-0" style={{ lineHeight: "1.5" }}></p>
        </Card>
       
      </div>
      </>
    );
  }
}

;
