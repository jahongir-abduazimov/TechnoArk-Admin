import "./style.scss";
import Layout from "../../layout/index";
import { useEffect } from "react";
import { getDataFromCookie } from "@data-service";
import { useNavigate } from "react-router-dom";
const index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getDataFromCookie("access_token")) {
      navigate("/signin");
    }
  }, []);
  return (
    <div>
      <Layout />
    </div>
  );
};

export default index;
