import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <div className="min-h-screen bg-[#e7dbd1] flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Password</h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your email and we’ll send you a reset link.
        </p>
        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8b8ab]" />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition">Send Reset Link</button>
        </form>
        <p className="text-center text-sm mt-6">
          Remembered your password? <Link to="/login" className="text-[#a78b71] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
