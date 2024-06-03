import React from "react";
import {
    HomeOutlined,
    ProductOutlined,
    AppstoreOutlined,
  } from '@ant-design/icons';

interface Route{
    path: string;
    content: string;
    icon: React.ReactElement;
}

export const routes: Route[] = [
    {
        path: "/",
        content: "Main",
        icon: <HomeOutlined style={{fontSize: 20}} />
    },
    {
        path: "/products",
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
]
