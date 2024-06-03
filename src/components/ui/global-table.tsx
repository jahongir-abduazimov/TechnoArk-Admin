import React from "react";
import { Table } from "antd";
import { TableProps } from "@interfaces";

const App: React.FC<TableProps> = ({columns, data, boolean }) => {
  return (
    <Table
      loading={boolean}
      size="large"
      columns={columns}
      dataSource={data}
      bordered
      pagination={false}
      scroll={{ y: 405 }}
    />
  );
};

export default App;
