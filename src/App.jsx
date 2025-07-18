import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy-loaded pages and layouts
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Products = React.lazy(() => import("./pages/Product/Products"));
const AddProduct = React.lazy(() => import("./pages/Product/AddProduct"));
const EditProduct = React.lazy(() => import("./pages/Product/EditProduct"));
const Testimonial = React.lazy(() => import("./pages/Testimoni/Testimonial"));
const AddTestimonial = React.lazy(() => import("./pages/Testimoni/AddTestimonial"));
const EditTestimonial = React.lazy(() => import("./pages/Testimoni/EditTestimonial"));
const ProductDetail = React.lazy(() => import("./pages/Product/ProductDetail"));
const Customer = React.lazy(() => import("./pages/customer/Customer"));
const CustomerDetail = React.lazy(() => import("./pages/CustomerDetail"));
const Setting = React.lazy(() => import("./pages/Setting"));
const Quotes = React.lazy(() => import("./pages/Quotes"));
const ErrorPages = React.lazy(() => import("./pages/ErrorPages"));
const User = React.lazy(() => import("./pages/User"));
const Review = React.lazy(() => import("./pages/Review"));
const PredictBadge = React.lazy(() => import("./pages/PredictBadge"));
const CRM = React.lazy(() => import("./pages/CRM/CRM"));
const CRMedit = React.lazy(() => import("./pages/CRM/CRMedit"));

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

import "./assets/tailwind.css";
import AddCustomer from "./pages/customer/AddCustomer";
import EditCustomer from "./pages/customer/EditCustomer";
import Transactions from "./pages/Transaction/Transaction";
import AddTransactions from "./pages/Transaction/AddTransaction";
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
        <Route path="/product/edit/:id" element={<EditProduct />} />
        <Route path="/product/create" element={<AddProduct />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/customer/:id" element={<CustomerDetail />} />
        <Route path="/customer/create" element={<AddCustomer />} />
        <Route path="/customer/edit/:id" element={<EditCustomer />} />
        <Route path="/transaction" element={<Transactions />} />
        <Route path="/transaction/create" element={<AddTransactions />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/user" element={<User />} />
        <Route path="/review" element={<Review />} />
        <Route path="/predict-badge" element={<PredictBadge />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/crm/edit" element={<CRMedit />} />
        <Route path="/testimoni" element={<Testimonial />} />
        <Route path="/testimoni/edit/:id" element={<EditTestimonial />} />
        <Route path="/testimoni/create" element={<AddTestimonial />} />
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
