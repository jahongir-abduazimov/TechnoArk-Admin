import useBrandsStore from "../../../store/brands";
import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { SomeComponentProps } from "@interfaces";
import useCategoryStore from "../../../store/category";
const MyModal: React.FC<SomeComponentProps> = ({ record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { updateBrand } = useBrandsStore();
  const { getCategories } = useCategoryStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
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
  const [params] = useState({
    limit: 10,
    page: 1,
  });
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
  return (
    <>
      <div onClick={handleChange}>
        <Button
          onClick={() => setIsModalVisible(true)}
          icon={<EditOutlined />}
        />
      </div>
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
            name="name"
            rules={[{ required: true, message: "Enter category name" }]}
            initialValue={record?.name}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Select category"
            name="categoryId"
            rules={[{ required: true, message: "Enter category name" }]}
            initialValue={record?.category_id}
          >
            <Select size="large" options={category} />
          </Form.Item>
          <Form.Item
            label="Brand description"
            name="description"
            rules={[{ required: true, message: "Enter category name" }]}
            initialValue={record?.description}
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
