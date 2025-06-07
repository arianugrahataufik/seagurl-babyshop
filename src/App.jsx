import React, { Suspense } from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";

// Lazy-loaded pages and layouts
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Products = React.lazy(() => import("./pages/Products"));
const Customer = React.lazy(() => import("./pages/Customer"));
const Setting = React.lazy(() => import("./pages/Setting"));
const ErrorPages = React.lazy(() => import("./pages/ErrorPages"));

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
        <Route path="/customer" element={<Customer />} />
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
