import useCategoryStore from "../../../store/category";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
const MyModal: React.FC = ({record}:any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { updateCategory, getCategories } = useCategoryStore();
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value:any) => {
    const response = await updateCategory(record.id, value);
    if (response?.status === 200) {
      getCategories();
      setIsModalVisible(false);
      form.resetFields();
    }
  }
  return (
    <>
      <Button
        onClick={() => setIsModalVisible(true)}
        icon={<EditOutlined/>}
      />
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
