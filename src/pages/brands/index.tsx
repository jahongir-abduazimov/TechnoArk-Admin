import { useEffect } from "react";
import useBrandsStore from "../../store/brands";
import GlobalTable from "@global-table";
import { Button } from "antd";
import { Brand, UpdateBrands } from "@modals";
import { DeleteBrands } from "@modals";
const index = () => {
  const { getBrands, isLoading, brand } = useBrandsStore();
  useEffect(() => {
    getBrands();
  }, []);
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
      dataIndex: "brand_name",
      key: "brand_name",
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
  return (
    <>
      <div className="flex justify-end">
        <Brand />
      </div>
      <GlobalTable columns={columns} data={brand} boolean={isLoading} />
    </>
  );
};

export default index;
