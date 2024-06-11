import useBrandCategoryStore from "../../store/brand-category";
import Table from "@global-table";
import { useEffect, useState } from "react";
import { AddBrandCategory } from "@modals";
import { DeleteBrandCategory } from "@modals";
import { UpdateBrandCategory } from "@modals";
import { Input, Pagination } from "antd";
const index = () => {
  const { getBrandCategory, brand_category, isLoading, totalCount } =
    useBrandCategoryStore();
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
  });
  useEffect(() => {
    getBrandCategory(params);
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
      title: "Category name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-5">
          <UpdateBrandCategory record={record} />
          <DeleteBrandCategory record={record} />
        </div>
      ),
    },
  ];
  const search = (value:any) => {
    setParams((prevParams) => ({ ...prevParams, search: value }));
  }
  const page = (page:any) => {
    setParams((prevParams) => ({...prevParams, page: page }));
  }
  return (
    <>
      <div className="flex justify-between mb-3">
        <Input
          onChange={(e) => search(e.target.value)}
          placeholder="Search category brand..."
          style={{ width: "300px" }}
        />
        <AddBrandCategory />
      </div>
      <Table columns={columns} data={brand_category} boolean={isLoading} />
      <Pagination style={{marginTop: "20px"}} total={totalCount} onChange={(e)=>page(e)}/>
    </>
  );
};

export default index;
