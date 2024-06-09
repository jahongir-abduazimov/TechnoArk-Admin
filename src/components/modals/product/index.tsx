import useBrandCategoryStore from "../../../store/brand-category";
import useBrandsStore from "../../../store/brands";
import useCategoryStore from "../../../store/category";
import useProductStore from "../../../store/products";
import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
const MyModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { createProduct } = useProductStore();
  const { getCategories } = useCategoryStore();
  const { getBrandsByCategory } = useBrandsStore();
  const { getBrandCategoryByBrand } = useBrandCategoryStore();
  const [selectCategories, setCategories] = useState([]);
  const [selectBrands, setBrands] = useState([]);
  const [selectBrandCategory, setBrandCategory] = useState([]);
  const [brandDisable, setBrandDisable] = useState(true);
  const [brandCategoryDisable, setBrandCategoryDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [brandLoading, setBrandLoading] = useState(false);
  const [brandCategoryLoading, setBrandCategoryLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value: any) => {
    const payload = {
      name: value.name,
      price: Number(value.price),
      category_id: value.category_id,
      brand_id: value.brand_id,
      brand_category_id: value.brand_category_id,
    };
    setLoading(true);
    const response = await createProduct(payload);
    if (response?.status === 201) {
      setIsModalVisible(false);
      form.resetFields();
    }
    setLoading(false);
  };
  const [params] = useState({
    limit: 1000,
    page: 1,
  });
  const getSelectCategories = async () => {
    setCategoryLoading(true);
    const response = await getCategories(params);
    if (response?.status === 200) {
      setCategories(
        response.data.data.categories.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
    setCategoryLoading(false);
  };
  const getSelectBrands = async (id: any) => {
    setBrandLoading(true);
    const response = await getBrandsByCategory(id);
    if (response?.status === 200) {
      setBrands(
        response.data.data.brands.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
    setBrandLoading(false);
    setBrandDisable(false);
  };
  const getSelectBrandCategory = async (id: any) => {
    setBrandCategoryLoading(true);
    const response = await getBrandCategoryByBrand(id);
    if (response?.status === 200) {
      setBrandCategory(
        response.data.data.brandCategories.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
      setBrandCategoryLoading(false);
      setBrandCategoryDisable(false);
    }
  };
  return (
    <>
      <div onClick={getSelectCategories}>
        <Button
          onClick={() => setIsModalVisible(true)}
          size="large"
          type="primary"
        >
          Add New Product
        </Button>
      </div>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        title="Add new product"
        footer
        style={{ maxWidth: "450px", position: "relative", top: "10px" }}
      >
        <Form
          form={form}
          name="basic"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={(values) => handleSubmit(values)}
          layout="vertical"
        >
          <Form.Item
            label="Product name"
            name="name"
            rules={[{ required: true, message: "Enter product name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Product price"
            name="price"
            rules={[{ required: true, message: "Enter product price" }]}
          >
            <Input type="number" size="large" />
          </Form.Item>
          <Form.Item
            label="Select category name"
            name="category_id"
            rules={[{ required: true, message: "Select category" }]}
          >
            <Select
              loading={categoryLoading}
              onSelect={(value) => getSelectBrands(value)}
              options={selectCategories}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Select brand name"
            name="brand_id"
            rules={[{ required: true, message: "Select brand" }]}
          >
            <Select
              loading={brandLoading}
              onSelect={(value) => getSelectBrandCategory(value)}
              disabled={brandDisable}
              options={selectBrands}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Select brand category"
            name="brand_category_id"
            rules={[{ required: true, message: "Select brand category" }]}
          >
            <Select
              loading={brandCategoryLoading}
              disabled={brandCategoryDisable}
              options={selectBrandCategory}
              size="large"
            />
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
