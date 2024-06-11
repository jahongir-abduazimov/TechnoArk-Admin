import { useEffect, useState } from "react";
import useAuthStore from "../../store/auth";
import { getDataFromCookie, removeDataFromCookie } from "@data-service";
import ProfilImage from "../../assets/images.png";
import { DeleteAccount, UpdateAccount } from "@modals";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const index = () => {
  const { getAdmin, data } = useAuthStore();
  const id: any = getDataFromCookie("admin_id");
  const [admin, setAdmin] = useState()
  const navigate = useNavigate();
  const getData = async () => {
    const response = await getAdmin(id);
    setAdmin(response.data.data);
  };
  useEffect(() => {
    getData();
  }, []);
  const createAccount = () => {
    removeDataFromCookie("admin_id");
    removeDataFromCookie("access_token");
    removeDataFromCookie("refresh_token");
    navigate("/signup");
    window.location.reload();
  }
  return (
    <>
      <div className="flex gap-x-[200px] items-start">
        <img src={ProfilImage} alt="" />
        <div className="grid grid-cols-2 gap-y-5">
          <div>
            <p>First name</p>
            <p className="font-semibold text-[20px]">{data?.first_name}</p>
          </div>
          <div>
            <p>Email</p>
            <p className="font-semibold text-[20px]">{data?.email}</p>
          </div>
          <div>
            <p>Last name</p>
            <p className="font-semibold text-[20px]">{data?.last_name}</p>
          </div>
          <div>
            <p>Phon number</p>
            <p className="font-semibold text-[20px]">{data?.phone_number}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button size="large" onClick={createAccount} type="primary" style={{backgroundColor: "#59B259"}}>
              Create account
            </Button>
            <UpdateAccount data={admin}/>
            <DeleteAccount />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
