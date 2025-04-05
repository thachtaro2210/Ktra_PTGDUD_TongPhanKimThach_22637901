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
      .then(data => setContentData(data)); // Lưu trữ dữ liệu từ API vào state
  }, []);

  useEffect(() => {
    if (contentData && tableRef.current && !tableInstance.current) {
      // Khởi tạo DataTable khi có dữ liệu và chưa khởi tạo bảng
      tableInstance.current = $(tableRef.current).DataTable({
        data: contentData || [],  // Dữ liệu là mảng content
        columns: [
          { title: "ID", data: "id" },
          { title: "Title", data: "title" },
          { title: "Body", data: "body" }
        ],
        pageLength: 10,
        responsive: true
      });
    }

    // Dọn dẹp khi component bị unmount
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
          <h3>{contentData.title}</h3> {/* Thêm tiêu đề */}
          <div className="table-responsive">
            <table ref={tableRef} className="display" width="100%"></table>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
