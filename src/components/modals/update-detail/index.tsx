import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import useProductDetailStore from "../../../store/product-detail";
import TextArea from "antd/es/input/TextArea";
const MyModal: React.FC<any> = ({ detail }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { updateProductDetail } = useProductDetailStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const payload = {
      quantity: Number(value.quantity),
      description: value.description,
      discount: Number(value.discount),
      colors: value.colors,
      product_id: detail.product_id,
    }
    const response = await updateProductDetail(detail.product_id, payload);
    if (response?.status === 200) {
      setIsModalVisible(false);
      form.resetFields();
    }
    setLoading(false);
  };
  return (
    <>
      <Button
        type="primary"
        size="large"
        onClick={() => setIsModalVisible(true)}
        style={{ backgroundColor: "#FFBC01" }}
      >
        Update detail
      </Button>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        title="Update subcategory"
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
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Enter quantity" }]}
            initialValue={detail?.quantity}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: "Enter discount" }]}
            initialValue={detail?.discount}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Colors"
            name="colors"
            rules={[{ required: true, message: "Enter color" }]}
            initialValue={detail?.colors}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Enter description" }]}
            initialValue={detail?.description}
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
