import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((response) => {
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        }
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message || "An error occurred");
        } else {
          setError(err.message || "An unknown error occurred");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#e7dbd1] flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back 👋</h2>

        {error && (
          <div className="bg-red-100 mb-5 p-4 text-sm text-gray-700 rounded-lg flex items-center">
            <BsFillExclamationDiamondFill className="text-red-600 mr-2 text-lg" />
            {error}
          </div>
        )}

        {loading && (
          <div className="bg-gray-100 mb-5 p-4 text-sm text-gray-700 rounded-lg flex items-center">
            <ImSpinner2 className="animate-spin mr-2" />
            Logging in...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={dataForm.email}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8b8ab]"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={dataForm.password}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8b8ab]"
              placeholder="********"
            />
          </div>
          <div className="text-right text-sm">
            <Link to="/forgot" className="text-[#a78b71] hover:underline">Forgot password?</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#a78b71] hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
