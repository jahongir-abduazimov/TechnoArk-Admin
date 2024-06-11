import Table from "../../components/ui/global-table";
import { Category } from "@modals";
import useCategoryStore from "../../store/category";
import { useEffect, useState } from "react";
import { DeleteModal, UpdateCategory } from "@modals";
import { EnterOutlined } from "@ant-design/icons";
import { Button, Input, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
const index = () => {
  const { getCategories, isLoading, categories, totalCount } = useCategoryStore();
  const navigate = useNavigate();
  
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    search: "",
  });
  useEffect(() => {
    getCategories(params);
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
          <UpdateCategory record={record} />
          <DeleteModal record={record} />
          <Button
            onClick={() => navigate(`/categories/${record.id}`)}
            icon={<EnterOutlined />}
          />
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
        <Category />
      </div>
      <Table columns={columns} data={categories} boolean={isLoading} />
      <Pagination style={{marginTop: "20px"}} total={totalCount} onChange={(e)=>page(e)}/>
    </>
  );
};

export default index;
