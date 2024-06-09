import Table from "../../components/ui/global-table";

import { SubCategory } from "@modals";
import useCategoryStore from "../../store/category";
import { useEffect, useState } from "react";
import { DeleteSubCategory, UpdateSubCategory } from "@modals";
import { useParams } from "react-router-dom";
const index = () => {
  const { getSubCategory, isLoading, subCategories } = useCategoryStore();
  const { id } = useParams();
  const [params] = useState({
    limit: 10,
    page: 1,
    search: "",
  })
  const getData = async () => {
    await getSubCategory(id, params);
  };
  useEffect(() => {
    getData();
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
          <UpdateSubCategory record={record} />
          <DeleteSubCategory record={record} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end">
        <SubCategory />
      </div>
      <Table columns={columns} data={subCategories} boolean={isLoading} />
    </>
  );
};

export default index;
