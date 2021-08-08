import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllModules } from "ag-grid-enterprise";
import { Header, Segment } from "semantic-ui-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";
import LoadingPlaceholder from "./loadingPlaceholder";
import CustomNoRowsOverlay from "./customNoRowsOverlay.js";

LicenseManager.setLicenseKey(
  "Elixia_Tech_Solutions_Ltd_MultiApp_1Devs16_March_2019__MTU1MjY5NDQwMDAwMA==c4c29e5702e62789dbdb799433c73545"
);

class AgGridTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: AllModules,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        enableValue: true,
        enableRowGroup: true,
        enablePivot: true,
      },
      sideBar: {
        toolPanels: [
          {
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel",
          },
          {
            id: "filters",
            labelDefault: "Filters",
            labelKey: "filters",
            iconKey: "filter",
            toolPanel: "agFiltersToolPanel",
          },
        ],
        defaultToolPanel: "",
      },
      isLoading: true,
      rowData: [],
      searchValue: "",
      // ag grid custom overlay
      frameworkComponents: {
        customNoRowsOverlay: CustomNoRowsOverlay,
      },
      noRowsOverlayComponent: "customNoRowsOverlay",
      noRowsOverlayComponentParams: {
        noRowsMessageFunc: function () {
          return "No Recods Found";
        },
      },
    };
  }

  componentDidMount() {
    // console.log("ag grid table mounted");
  }

  handleChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  getParams() {
    return {
      columnGroups: true,
    };
  }

  onBtnExportDataAsExcel = () => {
    var params = this.getParams();
    this.gridApi.exportDataAsExcel(params);
  };

  onGridReady = (prams) => {
    console.log("ag grid is read ", prams);
    this.gridApi = prams.api;
    this.setState({
      isLoading: Boolean(this.props.isLoading),
    });
    prams.api.sizeColumnsToFit();
  };

  importDataGrid = () => {
    console.log("import the data grid");
  };

  exportDataGrid = () => {
    let keys = [];
    this.props.columnDefs.forEach((element) => {
      element.field !== "edit" && keys.push(element.headerName);
    });
    // console.log(keys);
    let param = {
      fileName: this.props.titleBarTitle,
    };
    this.gridApi.exportDataAsExcel(param);
  };

  filterChanged = (e) => {
    if (this.gridApi.getDisplayedRowCount() === 0) {
      this.gridApi.showNoRowsOverlay();
    } else {
      this.gridApi.hideOverlay();
    }
  };

  render() {
    const { frameworkComponents } = this.state;

    if (this.props.isLoading === true) {
      return (
        <React.Fragment>
          <LoadingPlaceholder />
        </React.Fragment>
      );
    } else if (!this.props.rowData || this.props.rowData.length === 0) {
      return (
        <React.Fragment>
          <Segment className="m-2">
            <center>
              <Header>NO Record(s) Found</Header>
            </center>
          </Segment>
        </React.Fragment>
      );
    } else {
      return (
        <>
          <div className="ag-theme-material agOver">
            <AgGridReact
              domLayout="autoHeight"
              modules={this.state.modules}
              sideBar={this.state.sideBar}
              rowGroupPanelShow={"always"}
              quickFilterText={this.state.searchValue}
              suppressAutoSize={true}
              columnDefs={this.props.columnDefs}
              defaultColDef={this.state.defaultColDef}
              frameworkComponents={frameworkComponents}
              rowSelection="multiple"
              rowData={this.props.rowData}
              pagination={true}
              paginationPageSize={10}
              onGridReady={this.onGridReady}
              noRowsOverlayComponent={this.state.noRowsOverlayComponent}
              noRowsOverlayComponentParams={
                this.state.noRowsOverlayComponentParams
              }
              onFilterChanged={this.filterChanged}
            />
          </div>
        </>
      );
    }
  }
}

export default AgGridTable;
