import useAdsStore from "../../../store/ads";
import { Button, Form, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
const MyModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { createAds } = useAdsStore();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const formData: any = new FormData();
    formData.append("position", value.position);
    value.file.fileList.forEach((file: any) => {
      formData.append("file", file.originFileObj);
    });
    const response = await createAds(formData);
    if (response?.status === 201) {
      setIsModalVisible(false);
      form.resetFields();
    }
    setLoading(false);
  };
  return (
    <>
      <Button
        onClick={() => setIsModalVisible(true)}
        size="large"
        type="primary"
      >
        Add New Banner
      </Button>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        title="Add new brand"
        footer
        style={{ maxWidth: "450px", position: "relative", top: "50px" }}
      >
        <Form
          form={form}
          name="basic"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={(values) => handleSubmit(values)}
          layout="vertical"
        >
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Enter position" }]}
          >
            <Input size="large" type="number" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="file"
            rules={[{ required: true, message: "Enter image" }]}
          >
            <Upload
              beforeUpload={() => false} // Prevent auto upload
              listType="picture"
              multiple
              maxCount={1}
            >
              <Button size="large">
                <UploadOutlined />
                Click to upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              loading={loading}
              iconPosition="end"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default MyModal;
