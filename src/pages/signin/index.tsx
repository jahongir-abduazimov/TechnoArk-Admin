import "./style.scss";
import LoginImage from "../../assets/login-bg.svg";
import { Button, Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import Notification from "@notification";
import useAuthStore from "../../store/auth";
import { setDataToCookie } from "@data-service";
import { useState } from "react";
const index = () => {
  const { getData } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const response = await getData(value);
    if (response?.status === 201) {
      setDataToCookie("access_token", response.data.tokens.access_token);
      setDataToCookie("refresh_token", response.data.tokens.refresh_token);
      Notification({
        title: response.data.msg,
        type: "success",
      });
      navigate("/");
    } else {
      Notification({
        title: "Email or password is incorrect",
        type: "error",
      });
    }
    setLoading(false);
  };
  return (
    <div className="w-[100%] h-[100vh] flex">
      <div className="w-[50%] bg-[#1677ff10] flex items-center justify-center">
        <img src={LoginImage} alt="bg" />
      </div>
      <div className=" w-[50%] flex items-center justify-center">
        <div>
          <h1 className="text-[35px] font-semibold mb-4">Login</h1>
          <Form
            name="basic"
            style={{ width: "400px" }}
            onFinish={(values) => handleSubmit(values)}
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ type: "email", required: true }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                style={{ width: "100%", marginTop: "10px" }}
                size="large"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Submit
              </Button>
              <div className="flex mt-2 items-center gap-2">
                <p className="text-[16px]">Don’t you have an account?</p>
                <p
                  onClick={() => navigate("/signup")}
                  className="cursor-pointer text-[16px] hover:text-blue font-semibold duration-150"
                >
                  Registrate
                </p>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default index;
