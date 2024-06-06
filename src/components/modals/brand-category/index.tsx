import useBrandCategoryStore from "../../../store/brand-category";
import useBrandsStore from "../../../store/brands";
import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
const MyModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { createBrandCategory } = useBrandCategoryStore();
  const { getBrands } = useBrandsStore();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectLoading, setSelectLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [params] = useState({
    limit: 1000,
    page: 1,
  });
  const getSelectOptions = async () => {
    setSelectLoading(true);
    const response = await getBrands(params);
    if (response?.status === 200) {
      setBrands(
        response.data.data.brands.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
    setSelectLoading(false);
  };
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const response = await createBrandCategory(value);
    if (response?.status === 201) {
      setIsModalVisible(false);
      form.resetFields();
    }
    setLoading(false);
  };
  return (
    <>
      <div onClick={getSelectOptions}>
        <Button
          onClick={() => setIsModalVisible(true)}
          size="large"
          type="primary"
        >
          Add New Brand Category
        </Button>
      </div>
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
            label="Category name"
            name="name"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Select brand"
            name="brand_id"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Select loading={selectLoading} size="large" options={brands} />
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
