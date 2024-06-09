import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import useBrandCategoryStore from "../../../store/brand-category";
import useBrandsStore from "../../../store/brands";
import {SomeComponentProps} from "@interfaces";

const MyModal: React.FC<SomeComponentProps> = ({ record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { updateBrandCategory } = useBrandCategoryStore();
  const { getBrands } = useBrandsStore();
  const [brands, setBrands] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectLoading, setSelectLoading] = useState(false);
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
    const response = await updateBrandCategory(record.id, value);
    if (response?.status === 200) {
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
          icon={<EditOutlined />}
        />
      </div>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        title="Update brand category"
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
          <Form.Item
            label="Select brand"
            name="brand_id"
            rules={[{ required: true, message: "Enter category name" }]}
            initialValue={record?.brand_id}
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default MyModal;
