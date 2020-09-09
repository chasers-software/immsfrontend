import React, { Component } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";

export class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    };
  }

  componentDidMount() {
    let files = [];
    for (let i = 0; i < 50; i++) {
      let node = {
        key: i,
        data: {
          name: "Anjil Bishowkarma",
          size: "-",
          type: "-"
        },
        children: [
          {
            key: i + " - 0",
            data: {
              name: ["Computer Graphics"],
              size: "20",
              type: "18"
            }
          },
          {
            key: i + " - 0",
            data: {
              name: ["Software Engineering"],
              size: "20",
              type: "18"
            }
          }
        ]
      };

      files.push(node);
    }

    this.setState({
      nodes: files
    });
  }

  render() {
    return (
      <div>
        <div className="card">
          <TreeTable value={this.state.nodes} paginator rows={10}>
            <Column field="name" header="Name" expander></Column>
            <Column field="size" header="Full Marks"></Column>
            <Column field="type" header="Marks Obtained"></Column>
          </TreeTable>
        </div>
      </div>
    );
  }
}
