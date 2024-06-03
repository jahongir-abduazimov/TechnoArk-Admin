import Table from "../../components/ui/global-table";

import { Category } from "@modals";
import useCategoryStore from "../../store/category";
import { useEffect } from "react";
import { DeleteModal, UpdateCategory } from "@modals";
const index = () => {
  const { getCategories, isLoading, categories } = useCategoryStore();
  const getData = async () => {
    await getCategories();
  };
  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      title: "Category name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-3">
          <UpdateCategory record={record}/>
          <DeleteModal record={record} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end">
        <Category />
      </div>
      <Table columns={columns} data={categories} boolean={isLoading} />
    </>
  );
};

export default index;
