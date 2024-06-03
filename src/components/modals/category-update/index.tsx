import useCategoryStore from "../../../store/category";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
const MyModal: React.FC = ({ record }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { updateCategory, getCategories, getSubCategory } = useCategoryStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const response = await updateCategory(record.id, value);
    if (response?.status === 200) {
      getCategories();
      if (record.parent_category_id) {
        getSubCategory(record.parent_category_id);
      }
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
        title="Update category"
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
            label="Category name"
            name="category_name"
            rules={[{ required: true, message: "Enter category name" }]}
            initialValue={record?.category_name}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              loading={loading}
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
