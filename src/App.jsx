import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy-loaded pages and layouts
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Customer = React.lazy(() => import("./pages/Customer"));
const CustomerDetail = React.lazy(() => import("./pages/CustomerDetail"));
const Setting = React.lazy(() => import("./pages/Setting"));
const Quotes = React.lazy(() => import("./pages/Quotes"));
const ErrorPages = React.lazy(() => import("./pages/ErrorPages"));
const User = React.lazy(() => import("./pages/User"));

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

import "./assets/tailwind.css";
const Loading = React.lazy(() => import("./components/Loading"));

function App() {
  return (
    <Suspense
        fallback={
          <div className="p-4">
            <Loading />
          </div>
        }
      >
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="*" element={<ErrorPages code={404} />} />
        <Route path="/400" element={<ErrorPages code={400} />} />
        <Route path="/401" element={<ErrorPages code={401} />} />
        <Route path="/403" element={<ErrorPages code={403} />} />

        <Route path="/" element={<Dashboard />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/customer/:id" element={<CustomerDetail />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/user" element={<User />} />
        <Route path="/setting" element={<Setting />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<Forgot />} />
      </Route>
    </Routes>
    </Suspense>
  );
}
export default App;
