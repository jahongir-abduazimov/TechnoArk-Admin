import useAdsStore from "../../store/ads";
import { useEffect } from "react";
import GlobalTable from "../../components/ui/global-table";
import { Image } from "antd";
import { Ads, DeleteAds } from "@modals";
const index = () => {
  const { getAds, isLoading, ads } = useAdsStore();
  useEffect(() => {
    getAds();
  }, []);
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: any) => index + 1,
      width: "52px",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (_: any, record: any) => (
        <Image
          src={record.image}
          alt={record.name}
          style={{ maxHeight: "50px" }}
        />
      ),
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (_: any, record: any) => (
        <p className="text-[18px] font-bold">{record.position}</p>
      ),
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
        render: (_: any, record: any) => (
          <div className="flex gap-5 justify-center">
            {/* <UpdateBrands record={record} /> */}
            <DeleteAds record={record} />
          </div>
        ),
    },
  ];
  return (
    <div>
        <div className="flex justify-end mb-3">
          <Ads />
        </div>
      <GlobalTable columns={columns} boolean={isLoading} data={ads} />
    </div>
  );
};

export default index;
