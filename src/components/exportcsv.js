import React from "react";
import { CSVLink } from "react-csv";

function ExportCSV({ data, filename }) {
  const headers = [
    { label: "id", key: "id" },
    { label: "user_name", key: "user_name" },
    { label: "course_id", key: "course_id" },
    { label: "course_title", key: "course_title" },
    { label: "question_id", key: "question_id" },
    { label: "question_title", key: "question_title" },
    { label: "body", key: "body" },
    { label: "created_at", key: "created_at" },
    { label: "domain", key: "domain" },
    { label: "path", key: "path" },
    { label: "status", key: "status" },
    { label: "data", key: "data" },
    { label: "action", key: "action" },
    { label: "note", key: "note" }  
  ];

  return (
    <CSVLink data={data}  headers={headers} filename={filename}>
      Export to CSV
    </CSVLink>
  );
}

export default ExportCSV;