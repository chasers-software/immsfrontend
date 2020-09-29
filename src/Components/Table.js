import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ProductService from "../Service/ProductService";

export class EditableTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products1: null,
      products2: null,
      products3: null,
    };

    this.columnsedit = [
      { field: "assignmentOM", header: "Assignment OM" },
      { field: "practicalOM", header: "Practical OM"}
    ];


    this.productService = new ProductService();
    this.onEditorInit = this.onEditorInit.bind(this);
    this.onEditorCancel = this.onEditorCancel.bind(this);
    this.onEditorSubmit = this.onEditorSubmit.bind(this);
    this.positiveIntegerValidator = this.positiveIntegerValidator.bind(this);
    this.emptyValueValidator = this.emptyValueValidator.bind(this);
  }

  componentDidMount() {
    this.fetchProductData("products1");
    this.fetchProductData("products2");
    this.fetchProductData("products3");
  }

  fetchProductData(productStateKey) {
    this.productService
      .getProductsSmall()
      .then((data) => this.setState({ [`${productStateKey}`]: data }));
  }

  positiveIntegerValidator(props) {
    const { rowData, field } = props;
    return this.isPositiveInteger(rowData[field]);
  }

  emptyValueValidator(props) {
    const { rowData, field } = props;
    return rowData[field].trim().length > 0;
  }

  isPositiveInteger(val) {
    let str = String(val);
    str = str.trim();
    if (!str) {
      return false;
    }
    str = str.replace(/^0+/, "") || "0";
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  }

  onEditorInit(props) {
    const { rowIndex: index, field, rowData } = props;
    if (!this.editingCellRows[index]) {
      this.editingCellRows[index] = { ...rowData };
    }
    this.editingCellRows[index][field] = this.state.products2[index][field];
  }

  onEditorCancel(props) {
    const { rowIndex: index, field } = props;
    let products = [...this.state.products2];
    products[index][field] = this.editingCellRows[index][field];
    delete this.editingCellRows[index][field];

    this.setState({
      products2: products,
    });
  }

  onEditorSubmit(props) {
    const { rowIndex: index, field } = props;
    delete this.editingCellRows[index][field];
  }


  onEditorValueChange(productKey, props, value) {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    this.setState({ [`${productKey}`]: updatedProducts });
  }

  inputTextEditor(productKey, props, field) {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) =>
          this.onEditorValueChange(productKey, props, e.target.value)
        }
      />
    );
  }

  assignmentomEditor(productKey, props) {
    return this.inputTextEditor(productKey, props, "assignmentOM");
  }

  practicalomEditor(productKey, props) {
    return this.inputTextEditor(productKey, props, "practicalOM");
  }

  render() {
    return (
      <div className="datatable-editing-demo">
        <Toast ref={(el) => (this.toast = el)} />

        <div className="card">
          <h5>Marks Entry</h5>
          <p>
            Click on row to Edit and ESC to exit editing
          </p>
          <DataTable
            value={this.state.products2}
            editMode="cell"
            className="editable-cells-table"
          >
            <Column field="sn" header="SN"></Column>
            <Column field="urn" header="Unique ROll No"></Column>
            <Column field="name" header="Name"></Column>
               
            {this.columnsedit.map((col) => {
              const { field, header } = col;
              const validator =
                field === "assigmentOM" || field === "practicalOM"
                  ? this.positiveIntegerValidator
                  : this.emptyValueValidator;
              return (
                <Column
                  key={field}
                  field={field}
                  header={header}
                  editor={(props) =>
                    this.inputTextEditor("products2", props, field)
                  }
                  editorValidator={validator}
                  onEditorInit={this.onEditorInit}
                  onEditorCancel={this.onEditorCancel}
                  onEditorSubmit={this.onEditorSubmit}
                />
              );
            })}
          </DataTable>
        </div>

 
      </div>
    );
  }
}
