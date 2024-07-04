import { useEffect, useState } from "react";
import useProductStore from "../../store/products";
import Table from "@global-table";
import { Button, Input, Pagination } from "antd";
import { AddProduct, DeleteProduct, UpdateProduct } from "@modals";
import { EnterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const index = () => {
  const { getProducts, isLoading, products, totalCount } = useProductStore();
  const navigate = useNavigate();
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: any) => index + 1,
      width: "52px",
      align: "center",
    },
    {
      title: "Product name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-5 justify-center">
          <UpdateProduct record={record} />
          <DeleteProduct record={record} />
          <Button
            onClick={() => navigate(`/products/${record.id}`)}
            icon={<EnterOutlined />}
          />
        </div>
      ),
      align: "center",
    },
  ];
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    search: "",
  });
  useEffect(() => {
    getProducts(params);
  }, [params]);
  const search = (value: any) => {
    setParams((prevParams) => ({ ...prevParams, search: value }));
  };
  const page = (page: any) => {
    setParams((prevParams) => ({ ...prevParams, page: page }));
  };
  return (
    <>
      <div className="flex justify-between mb-3">
        <Input
          onChange={(e: any) => search(e.target.value)}
          placeholder="Search product..."
          style={{ width: 300 }}
          size="large"
        />
        <AddProduct />
      </div>
      <Table columns={columns} data={products} boolean={isLoading} />
      <Pagination
        style={{ marginTop: "20px" }}
        total={totalCount}
        onChange={(e) => page(e)}
      />
    </>
  );
};

export default index;
