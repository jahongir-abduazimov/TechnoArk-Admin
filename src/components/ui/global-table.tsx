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
      scroll={{ y: 343 }}
    />
  );
};

export default App;
