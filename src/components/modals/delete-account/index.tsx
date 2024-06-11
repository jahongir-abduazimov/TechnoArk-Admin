import { Button, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDataFromCookie, removeDataFromCookie } from "@data-service";
import useAuthStore from "../../../store/auth";

const MyModal: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { deleteAdmin } = useAuthStore();
  const id: any = getDataFromCookie("admin_id");
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleDelete = async () => {
    const response = await deleteAdmin(id);
    if (response?.status === 200) {
      removeDataFromCookie("access_token");
      removeDataFromCookie("refresh_token");
      removeDataFromCookie("admin_id");
      navigate("/signup");
      window.location.reload();
    }
  };
  return (
    <>
      <Button
        size="large"
        onClick={() => setIsModalVisible(true)}
        type="primary"
        style={{ backgroundColor: "red" }}
      >
        Delete account
      </Button>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        style={{ maxWidth: "450px" }}
        title="Are you sure you want to delete account?"
        footer={
          <div className="flex items-center gap-3 justify-end mt-10">
            <Button size="large" type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="large" type="primary" onClick={handleDelete}>
              Ok
            </Button>
          </div>
        }
      />
    </>
  );
};
export default MyModal;
