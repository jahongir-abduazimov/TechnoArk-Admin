import useCategoryStore from "../../../store/category";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
const MyModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { createCategory, getCategories } = useCategoryStore();
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value:any) => {
    const response = await createCategory(value);
    if (response?.status === 201) {
      getCategories();
      setIsModalVisible(false);
      form.resetFields();
    }
  }
  return (
    <>
      <Button
        onClick={() => setIsModalVisible(true)}
        size="large"
        type="primary"
      >
        Add New Category
      </Button>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        title="Add New Category"
        footer
        style={{ maxWidth: "450px" }}
      >
        <Form
          form={form}
          name="basic"
          style={{ width: '100%', marginTop:"20px" }}
          onFinish={(values) => handleSubmit(values)}
          layout="vertical"
        >
          <Form.Item
            label="Category name"
            name="category_name"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large"/>
          </Form.Item>

          <Form.Item>
            <Button size="large" style={{width: "100%"}} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default MyModal;
