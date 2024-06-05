import useBrandsStore from "../../../store/brands";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
const MyModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { getBrands, createBrand } = useBrandsStore();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const response = await createBrand({ ...value, position: 1 });
    console.log(response);
    if (response?.status === 201) {
      // getBrands();
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
        Add New Brand
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
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={(values) => handleSubmit(values)}
          layout="vertical"
        >
          <Form.Item
            label="Brand name"
            name="brand_name"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Brand image"
            name="image"
            rules={[{ required: true, message: "Enter brand description" }]}
          >
            <Input type="file" size="large" />
          </Form.Item>
          <Form.Item
            label="Brand description"
            name="brand_description"
            rules={[{ required: true, message: "Enter brand description" }]}
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
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default MyModal;
