import { useEffect, useState } from "react";
import useProductStore from "../../store/products";
import Table from "@global-table";
import { Input } from "antd";
import { AddProduct, DeleteProduct, UpdateProduct } from "@modals";
const index = () => {
  const { getProducts, isLoading, products } = useProductStore();
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: any) => index + 1,
      width: "52px",
    },
    {
      title: "Category name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-3">
          <UpdateProduct record={record} />
          <DeleteProduct record={record} />
        </div>
      ),
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
  return (
    <>
      <div className="flex justify-between">
        <Input
          onChange={(e: any) => search(e.target.value)}
          placeholder="Search product..."
          style={{ width: 300 }}
          size="large"
        />
        <AddProduct />
      </div>
      <Table columns={columns} data={products} boolean={isLoading} />
    </>
  );
};

export default index;
