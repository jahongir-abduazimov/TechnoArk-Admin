import React from "react";
import {
    ProductOutlined,
    AppstoreOutlined,
    SettingOutlined,
    StockOutlined
  } from '@ant-design/icons';

interface Route{
    path: string;
    content: string;
    icon: React.ReactElement;
}

export const routes: Route[] = [
    {
        path: "/",
        content: "Products",
        icon: <ProductOutlined style={{fontSize: 20}} />
    },
    {
        path: "/categories",
        content: "Categories",
        icon: <AppstoreOutlined style={{fontSize: 20}} />
    },
    {
        path: "/brands",
        content: "Brands",
        icon: <AppstoreOutlined style={{fontSize: 20}} />
    },
    {
        path: "/brand-category",
        content: "Brand category",
        icon: <AppstoreOutlined style={{fontSize: 20}} />
    },
    {
        path: "/ads",
        content: "Ads",
        icon: <AppstoreOutlined style={{fontSize: 20}} />
    },
    {
        path: "/stock",
        content: "Stock",
        icon: <StockOutlined style={{fontSize: 20}} />
    },
    {
        path: "/settings",
        content: "Settings",
        icon: <SettingOutlined style={{fontSize: 20}} />
    },
    
]
