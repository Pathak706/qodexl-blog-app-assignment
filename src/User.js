import React, { useContext } from "react";
import { DataContext } from "./DataContext";
import AgGridTable from "./agGridTable";

const User = () => {
  const { users } = useContext(DataContext);
  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Username", field: "username", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    {
      headerName: "Company",
      field: "company.name",
      sortable: true,
      filter: true,
    },
  ];
  return <AgGridTable columnDefs={columnDefs} rowData={users} />;
};

export default User;
