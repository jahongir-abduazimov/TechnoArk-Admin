import { Button, Modal } from "antd";
import { useState } from "react";
import useProductDetailStore from "../../../store/product-detail";

const MyModal: React.FC<any> = ({ id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { deleteProductDetail } = useProductDetailStore();
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const deleteData = async (id: number) => {
    setLoading(true);
    const response = await deleteProductDetail(id);
    if (response?.status === 200) {
      setIsModalVisible(false);
      window.location.reload();
    }
    setLoading(false);
  };
  return (
    <>
      <Button
        type="primary"
        size="large"
        onClick={() => setIsModalVisible(true)}
        style={{ backgroundColor: "red" }}
      >
        Delete detail
      </Button>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        style={{ maxWidth: "400px" }}
        title="Delete this details?"
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
              onClick={() => deleteData(id)}
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
