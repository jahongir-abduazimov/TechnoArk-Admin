import { useEffect } from "react";
import useAuthStore from "../../store/auth";
import { getDataFromCookie } from "@data-service";
import ProfilImage from "../../assets/images.png";
const index = () => {
  const { getAdmin, data } = useAuthStore();
  const id = getDataFromCookie("admin_id");
  const getData = async () => {
    await getAdmin(id);
  };
  useEffect(() => {
    getData();
  }, []);
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
        </div>
      </div>
    </>
  );
};

export default index;
