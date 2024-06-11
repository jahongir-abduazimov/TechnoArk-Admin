import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "../App";

import { Home, SignIn, SignUp, Products, Category, SubCategory, Brands, Settings, BrandCategory, Stock, SingleProduct } from "@pages";
const index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/categories/:id" element={<SubCategory />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brand-category" element={<BrandCategory />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default index;
