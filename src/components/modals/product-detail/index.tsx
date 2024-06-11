import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import useProductDetailStore from "../../../store/product-detail";
import { useParams } from "react-router-dom";
const MyModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { createProductDetail } = useProductDetailStore();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [form] = Form.useForm();
  const { id } = useParams();
  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const formData: any = new FormData();
    formData.append("files", image);
    formData.append("quantity", value.quantity);
    formData.append("discount", value.discount);
    formData.append("colors", value.colors);
    formData.append("description", value.description);
    formData.append("product_id", id);
    const response = await createProductDetail(formData);
    if (response?.status === 201) {
      setIsModalVisible(false);
      form.resetFields();
      window.location.reload();
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
        Add detail
      </Button>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        title="Add new category"
        footer
        style={{ maxWidth: "450px", position: "relative", top: "0px" }}
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
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input type="number" size="large" />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input type="number" size="large" />
          </Form.Item>
          <Form.Item
            label="Color"
            name="colors"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <TextArea size="large" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="files"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input type="file" onChange={handleImageChange} size="large" />
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
