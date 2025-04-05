import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';

export default function Content() {
  const [contentData, setContentData] = useState(null);
  const tableRef = useRef(null);
  const tableInstance = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3001/content")
      .then(res => res.json())
      .then(data => setContentData(data));
  }, []);

  useEffect(() => {
    // Initialize DataTable when contentData is available
    if (contentData && tableRef.current && !tableInstance.current) {
      // Assuming contentData has some array of items to display in the table
      tableInstance.current = $(tableRef.current).DataTable({
        data: contentData.items || [], // Replace with your actual data array property
        columns: [
          { title: "ID", data: "id" },
          { title: "Name", data: "name" },
          { title: "Description", data: "description" }
          // Add more columns as needed based on your data structure
        ],
        pageLength: 10,
        responsive: true
      });
    }

    // Cleanup function to destroy DataTable instance when component unmounts
    return () => {
      if (tableInstance.current) {
        tableInstance.current.destroy();
        tableInstance.current = null;
      }
    };
  }, [contentData]);

  console.log(contentData);

  return (
    <div className="content">
      {contentData ? (
        <>
          <h3>{contentData.title}</h3>
          <div className="table-responsive">
            <table ref={tableRef} className="display" width="100%"></table>
          </div>
        </>
      ) : "Loading..."}
    </div>
  );
}