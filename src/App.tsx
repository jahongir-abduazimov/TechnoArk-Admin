import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";
const App = () => {
  return (
    <>
      <ToastContainer />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#D55200",
          },
        }}
      >
        <Outlet />
      </ConfigProvider>
    </>
  );
};

export default App;
