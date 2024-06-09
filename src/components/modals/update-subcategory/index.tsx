import useCategoryStore from "../../../store/category";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
const MyModal: React.FC = ({ record }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { updateSubCategory } = useCategoryStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const category = {
      name: value.name,
      parent_category_id: Number(id),
    };
    const response = await updateSubCategory(record.id, category);
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
        title="Update subcategory"
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
            name="name"
            rules={[{ required: true, message: "Enter category name" }]}
            initialValue={record?.name}
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
