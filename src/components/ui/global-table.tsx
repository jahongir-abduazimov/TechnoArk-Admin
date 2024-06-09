import React from "react";
import { Pagination, Table } from "antd";
import { TableProps } from "@interfaces";

const App: React.FC<TableProps> = ({ columns, data, boolean }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const handlePageChange = (page: any, pageSize: any) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  
  return (
    <>
      <Table
        loading={boolean}
        size="large"
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ y: 343 }}
        pagination={false}
      />
    </>
  );
};

export default App;
