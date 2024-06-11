import Table from "../../components/ui/global-table";

import { SubCategory } from "@modals";
import useCategoryStore from "../../store/category";
import { useEffect, useState } from "react";
import { DeleteSubCategory, UpdateSubCategory } from "@modals";
import { useParams } from "react-router-dom";
import { Input, Pagination } from "antd";
const index = () => {
  const { getSubCategory, isLoading, subCategories, totalSubCategories } = useCategoryStore();
  const { id } = useParams();
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    search: "",
  });
  const getData = async () => {
    await getSubCategory(id, params);
  };
  useEffect(() => {
    getData();
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
          <UpdateSubCategory record={record} />
          <DeleteSubCategory record={record} />
        </div>
      ),
    },
  ];
  const search = (value: any) => {
    setParams((prevParams) => ({ ...prevParams, search: value }));
  };
  const page = (page:any) => {
    setParams((prevParams) => ({...prevParams, page: page }));
  }
  return (
    <>
      <div className="flex justify-between mb-3">
        <Input
          onChange={(e: any) => search(e.target.value)}
          placeholder="Search category..."
          style={{ width: 300 }}
          size="large"
        />
        <SubCategory />
      </div>
      <Table columns={columns} data={subCategories} boolean={isLoading} />
      <Pagination style={{marginTop: "20px"}} total={totalSubCategories} onChange={(e)=>page(e)}/>
    </>
  );
};

export default index;
