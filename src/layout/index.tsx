import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../router/router";
import { LogOut } from "@modals";
import Logo from "../assets/logo.svg";
import "./index.css";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider
        collapsedWidth={65}
        style={{ height: "100vh" }}
        width={250}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        {collapsed ? (
          <div
            onClick={() => navigate("/")}
            className="demo-logo-vertical cursor-pointer h-[60px] my-2 flex items-center mx-3"
          >
            <img
              src={Logo}
              alt="logo"
              className="w-[40px]"
            />
          </div>
        ) : (
          <div
            onClick={() => navigate("/")}
            className="demo-logo-vertical cursor-pointer mx-3 my-2 h-[60px] flex items-center gap-3"
          >
            <img
              src={Logo}
              alt="logo"
              className="w-[40px]"
            />
            <span className="text-[20px] text-[#fff]">TechnoArk</span>
          </div>
        )}
        <Menu theme="dark" selectedKeys={["none"]}>
          {routes.map((item, index) => (
            <Menu.Item
              icon={item.icon}
              key={index}
              className={item.path === pathname ? "ant-menu-items" : ""}
            >
              <NavLink to={item.path} key={index}>
                <span className="text-[17px]">{item.content}</span>
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-between items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <LogOut />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
