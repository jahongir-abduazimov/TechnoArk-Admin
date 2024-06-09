import { Pagination } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

function index(props: any) {
  const navigate = useNavigate();
  const location = useLocation();
  function handlechange(e: any) {
    props.setPage(e);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", e);
    navigate(`?${searchParams}`);
  }
  return (
    <Pagination
      className="flex justify-center mt-8"
      defaultCurrent={props.page}
      total={props.total}
      pageSize={5}
      onChange={(e) => handlechange(e)}
    />
  );
}

export default index;
