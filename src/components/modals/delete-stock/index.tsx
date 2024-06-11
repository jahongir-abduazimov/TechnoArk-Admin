import { Button, Modal } from "antd";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { SomeComponentProps } from "@interfaces"
import useStockStore from "../../../store/stock";

const MyModal: React.FC<SomeComponentProps> = ({ record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { deleteStock } = useStockStore();
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const deleteData = async (id: number) => {
    setLoading(true);
    const response = await deleteStock(id);
    if (response?.status === 200) {
      setIsModalVisible(false);
    }
    setLoading(false);
  };
  return (
    <>
      <Button
        onClick={() => setIsModalVisible(true)}
        icon={<DeleteOutlined />}
      />
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        style={{ maxWidth: "400px" }}
        title="Delete this stock?"
        footer={
          <div className="flex items-center gap-3 justify-end mt-10">
            <Button size="large" type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              loading={loading}
              iconPosition="end"
              size="large"
              type="primary"
              onClick={() => deleteData(record.id)}
            >
              Ok
            </Button>
          </div>
        }
      />
    </>
  );
};
export default MyModal;
