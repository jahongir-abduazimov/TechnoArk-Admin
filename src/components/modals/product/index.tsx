import React, { useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useBrandCategoryStore from "../../../store/brand-category";
import useBrandsStore from "../../../store/brands";
import useCategoryStore from "../../../store/category";
import useProductStore from "../../../store/products";

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
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = async (value: any) => {
    const formData: any = new FormData();
    formData.append("name", value.name);
    formData.append("price", value.price);
    formData.append("category_id", value.category_id);
    formData.append("brand_id", value.brand_id);
    formData.append("brand_category_id", value.brand_category_id);
    value.files.fileList.forEach((file: any) => {
      formData.append("files", file.originFileObj);
    });

    setLoading(true);
    const response = await createProduct(formData);
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
        <Button onClick={showModal} size="large" type="primary">
          Add New Product
        </Button>
      </div>
      <Drawer width={600} onClose={handleCancel} open={isModalVisible}>
        <p className="text-[24px] font-bold">Add product</p>
        <Form
          form={form}
          name="basic"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <div className="grid grid-cols-2 gap-x-5">
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
            <Form.Item
              label="Product image"
              name="files"
              rules={[{ required: true, message: "Select product image" }]}
            >
              <Upload
                beforeUpload={() => false} // Prevent auto upload
                listType="picture"
                multiple
              >
                <Button size="large" icon={<UploadOutlined />}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default MyModal;
