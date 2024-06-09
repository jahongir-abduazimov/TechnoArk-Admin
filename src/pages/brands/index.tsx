import { useEffect, useState } from "react";
import useBrandsStore from "../../store/brands";
import GlobalTable from "@global-table";
import { Brand, UpdateBrands } from "@modals";
import { DeleteBrands } from "@modals";
import { Input } from "antd";
const index = () => {
  const { getBrands, isLoading, brand } = useBrandsStore();
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
  });
  useEffect(() => {
    getBrands(params);
  }, [params]);
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: any) => index + 1,
      width: "52px",
    },
    {
      title: "Brands name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-3">
          <UpdateBrands record={record} />
          <DeleteBrands record={record} />
        </div>
      ),
    },
  ];
  const search = (value: any) => {
    setParams((prevParams) => ({ ...prevParams, search: value }));
  };
  return (
    <>
      <div className="flex justify-between">
        <Input
          onChange={(e) => search(e.target.value)}
          placeholder="Search brand..."
          style={{ width: "300px" }}
          size="large"
        />
        <Brand />
      </div>
      <GlobalTable columns={columns} data={brand} boolean={isLoading} />
    </>
  );
};

export default index;
