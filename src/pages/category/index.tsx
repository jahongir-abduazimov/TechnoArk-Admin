import Table from "../../components/ui/global-table";
import { Category } from "@modals";
import useCategoryStore from "../../store/category";
import { useEffect } from "react";
import { DeleteModal, UpdateCategory } from "@modals";
import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const index = () => {
  const { getCategories, isLoading, categories } = useCategoryStore();
  const navigate = useNavigate();
  const getData = async () => {
    await getCategories();
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
      dataIndex: "category_name",
      key: "category_name",
      
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-3">
          <UpdateCategory record={record} />
          <DeleteModal record={record} />
          <Button onClick={()=>navigate(`/categories/${record.id}`)} icon={<EyeOutlined />}/>
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
