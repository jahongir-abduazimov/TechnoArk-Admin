import useCategoryStore from "../../../store/category";
import useBrandsStore from "../../../store/brands";
import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
const MyModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { createBrand } = useBrandsStore();
  const { getCategories } = useCategoryStore();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [form] = Form.useForm();
  const [params] = useState({
    limit: 10,
    page: 1,
  });
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = async () => {
    const response = await getCategories(params);
    if (response?.status === 200) {
      setCategory(
        response.data.data.categories.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
  };
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const response = await createBrand(value);
    if (response?.status === 201) {
      setIsModalVisible(false);
      form.resetFields();
    }
    setLoading(false);
  };
  return (
    <>
      <div onClick={handleChange}>
        <Button
          onClick={() => setIsModalVisible(true)}
          size="large"
          type="primary"
        >
          Add New Brand
        </Button>
      </div>
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
            label="Brand name"
            name="name"
            rules={[{ required: true, message: "Enter brand name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Select category"
            name="category_id"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Select size="large" options={category} />
          </Form.Item>
          <Form.Item
            label="Brand image"
            name="file"
            rules={[{ required: true, message: "Enter brand image" }]}
          >
            <Input type="file" size="large" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
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
