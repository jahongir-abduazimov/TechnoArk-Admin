import useBrandsStore from "../../../store/brands";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
const MyModal: React.FC = ({ record }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { updateBrand } = useBrandsStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const response = await updateBrand(record.id, value);
    if (response?.status === 200) {
      setIsModalVisible(false);
      form.resetFields();
    }
    setLoading(false);
  };
  return (
    <>
      <Button onClick={() => setIsModalVisible(true)} icon={<EditOutlined />} />
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        title="Update brand"
        footer
        style={{ maxWidth: "450px" }}
      >
        <Form
          form={form}
          name="basic"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={(values) => handleSubmit(values)}
          layout="vertical"
        >
          <Form.Item
            label="Brand name"
            name="brand_name"
            rules={[{ required: true, message: "Enter category name" }]}
            initialValue={record?.brand_name}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Brand description"
            name="brand_description"
            rules={[{ required: true, message: "Enter category name" }]}
            initialValue={record?.brand_description}
          >
            <TextArea size="large" />
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default MyModal;
