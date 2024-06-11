import useProductStore from "../../../store/products";
import useBrandsStore from "../../../store/brands";
import useCategoryStore from "../../../store/category";
import useStockStore from "../../../store/stock";
import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
const MyModal: React.FC = () => {
  const [params] = useState({
    limit: 1000,
    page: 1,
    search: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { createStock } = useStockStore();
  const { getCategories } = useCategoryStore();
  const { getBrandsByCategory } = useBrandsStore();
  const { getProducts } = useProductStore();
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandDisable, setBrandDisable] = useState(true);
  const [brands, setBrands] = useState([]);
  const [productOption, setProductOption] = useState([]);
  const getCategoryOptions = async () => {
    setCategoryLoading(true);
    const response = await getCategories(params);
    if (response?.status === 200) {
      setCategoryOptions(
        response.data.data.categories.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
    setCategoryLoading(false);
  };
  const getBrandsOption = async (id: any) => {
    setBrandDisable(true);
    const response = await getBrandsByCategory(id);
    if (response?.status === 200) {
      setBrands(
        response.data.data.brands.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
    setBrandDisable(false);
  };
  const getPtoductOptions = async () => {
    const response = await getProducts({ limit: 1000, page: 1, search: "" });
    if (response?.status === 200) {
      setProductOption(
        response.data.data.products.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
  };
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const payload = {
      category_id: value.category_id,
      brand_id: value.brand_id,
      product_id: value.product_id,
      quantity: Number(value.quantity),
    };
    const response = await createStock(payload);
    if (response?.status === 201) {
      setIsModalVisible(false);
      form.resetFields();
    }
    setLoading(false);
  };
  const clickButton = () => {
    setIsModalVisible(true)
    getCategoryOptions()
    getPtoductOptions()
  }
  console.log(productOption);
  return (
    <>
        <Button
          onClick={clickButton}
          size="large"
          type="primary"
        >
          Add New Stock
        </Button>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        title="Add new stock"
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
            label="Select category"
            name="category_id"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Select
              loading={categoryLoading}
              options={categoryOptions}
              size="large"
              onSelect={(value) => getBrandsOption(value)}
            />
          </Form.Item>
          <Form.Item
            label="Select brand"
            name="brand_id"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Select
              onSelect={getPtoductOptions}
              disabled={brandDisable}
              options={brands}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Select product"
            name="product_id"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Select options={productOption} size="large" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input type="number" size="large" />
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
