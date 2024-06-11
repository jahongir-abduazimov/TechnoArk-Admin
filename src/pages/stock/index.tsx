import { useEffect, useState } from "react";
import useStockStore from "../../store/stock";
import Table from "@global-table";
import { Stock, DeleteStock, UpdateStock} from "@modals";
import { Pagination } from "antd";
const index = () => {
  const { getStocks, stocks, isLoading, totalCount } = useStockStore();
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: any) => index + 1,
      width: "52px",
    },
    {
      title: "Stock name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-5">
          <UpdateStock record={record}/>
          <DeleteStock record={record} />
        </div>
      ),
    },
  ];
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
  })
  useEffect(() => {
    getStocks(params);
  }, []);
  const page = (page:any) => {
    setParams((prevParams) => ({...prevParams, page: page }));
  }
  return (
    <>
      <div className="flex justify-end mb-3">
        <Stock />
      </div>
      <Table columns={columns} data={stocks} boolean={isLoading} />
      <Pagination style={{marginTop: "20px"}} total={totalCount} onChange={(e)=>page(e)}/>
    </>
  );
};

export default index;
