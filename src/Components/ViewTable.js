import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import "./ViewTable.scss";

export class ViewTable extends Component {
  constructor(props) {
    super(props);

    this.sales = [
      {
        product: "Bamboo Watch",
        lastYearSale: 51,
        thisYearSale: 40,
        lastYearProfit: 54406,
        thisYearProfit: 43342,
      },
      {
        product: "Black Watch",
        lastYearSale: 83,
        thisYearSale: 9,
        lastYearProfit: 423132,
        thisYearProfit: 312122,
      },
      {
        product: "Blue Band",
        lastYearSale: 38,
        thisYearSale: 5,
        lastYearProfit: 12321,
        thisYearProfit: 8500,
      },
      {
        product: "Blue T-Shirt",
        lastYearSale: 49,
        thisYearSale: 22,
        lastYearProfit: 745232,
        thisYearProfit: 65323,
      },
      {
        product: "Brown Purse",
        lastYearSale: 17,
        thisYearSale: 79,
        lastYearProfit: 643242,
        thisYearProfit: 500332,
      },
      {
        product: "Chakra Bracelet",
        lastYearSale: 52,
        thisYearSale: 65,
        lastYearProfit: 421132,
        thisYearProfit: 150005,
      },
      {
        product: "Galaxy Earrings",
        lastYearSale: 82,
        thisYearSale: 12,
        lastYearProfit: 131211,
        thisYearProfit: 100214,
      },
      {
        product: "Game Controller",
        lastYearSale: 44,
        thisYearSale: 45,
        lastYearProfit: 66442,
        thisYearProfit: 53322,
      },
      {
        product: "Gaming Set",
        lastYearSale: 90,
        thisYearSale: 56,
        lastYearProfit: 765442,
        thisYearProfit: 296232,
      },
      {
        product: "Gold Phone Case",
        lastYearSale: 75,
        thisYearSale: 54,
        lastYearProfit: 21212,
        thisYearProfit: 12533,
      },
    ];

    this.lastYearTotal = this.lastYearTotal.bind(this);
    this.thisYearTotal = this.thisYearTotal.bind(this);
    this.lastYearSaleBodyTemplate = this.lastYearSaleBodyTemplate.bind(this);
    this.thisYearSaleBodyTemplate = this.thisYearSaleBodyTemplate.bind(this);
    this.lastYearProfitBodyTemplate = this.lastYearProfitBodyTemplate.bind(
      this
    );
    this.thisYearProfitBodyTemplate = this.thisYearProfitBodyTemplate.bind(
      this
    );
  }

  lastYearSaleBodyTemplate(rowData) {
    return `${rowData.lastYearSale}%`;
  }

  thisYearSaleBodyTemplate(rowData) {
    return `${rowData.thisYearSale}%`;
  }

  lastYearProfitBodyTemplate(rowData) {
    return `${this.formatCurrency(rowData.lastYearProfit)}`;
  }

  thisYearProfitBodyTemplate(rowData) {
    return `${this.formatCurrency(rowData.thisYearProfit)}`;
  }

  formatCurrency(value) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  lastYearTotal() {
    let total = 0;
    for (let sale of this.sales) {
      total += sale.lastYearProfit;
    }

    return this.formatCurrency(total);
  }

  thisYearTotal() {
    let total = 0;
    for (let sale of this.sales) {
      total += sale.thisYearProfit;
    }

    return this.formatCurrency(total);
  }

  render() {
    let headerGroup = (
      <ColumnGroup>
        <Row>
          <Column header="Roll No" rowSpan={3} />
       <Column header="Full Name" rowSpan={5}/>
        </Row>
        <Row>
          <Column header="Internal Marks" colSpan={2} />
         
        </Row>
        <Row>
          <Column header="Assignment"  field="lastYearSale" />
          <Column header="Practical" sortable field="thisYearSale" />
        
        </Row>
      </ColumnGroup>
    );

    let footerGroup = (
      <ColumnGroup>
        <Row>
          <Column
            footer="Totals:"
            colSpan={3}
            className="p-datatable-header"
            footerStyle={{ textAlign: "right" }}
          />
          <Column footer={this.lastYearTotal} />
          <Column footer={this.thisYearTotal} />
        </Row>
      </ColumnGroup>
    );
    return (
        <div className="p-datatable">
        <div className="card">
            <p>THIS IS TEXT</p>
          <DataTable
            value={this.sales}
            headerColumnGroup={headerGroup}
            footerColumnGroup={footerGroup}

          >
            <Column className="p-datatable-gridlines" field="product" />
            <Column field="lastYearSale" body={this.lastYearSaleBodyTemplate} />
            <Column field="thisYearSale" body={this.thisYearSaleBodyTemplate} />
            <Column
              field="lastYearProfit"
              body={this.lastYearProfitBodyTemplate}
            />
           
          </DataTable>
        </div>
      </div>
    );
  }
}
