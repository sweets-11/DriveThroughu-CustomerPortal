import React, { useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./TicketTable.css";
import Search from "./Search";
import "./Search.css";
import { useTable } from "react-table";

export const TicketTable = ({ data, ticket }) => {
  const Navigate = useNavigate();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  const columns = React.useMemo(
    () => [
      {
        Header: "Ticket ID",
        accessor: "_id", // the accessor is the "key" in the data
      },
      {
        Header: "TripType",
        accessor: "tripType",
      },
      {
        Header: "CustomerName",
        accessor: "customerName",
      },
      {
        Header: "Customer Id",
        accessor: "customerId",
      },
      {
        Header: "Created At ",
        accessor: "createdAt",
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  console.log(data);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className="ticket-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          console.log("row", row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  onClick={() => Navigate(`/ticket/${cell.row.original._id}`)}
                  {...cell.getCellProps()}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TicketTable;
