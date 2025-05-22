import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const errorMessages = {
  400: {
    title: "400 - Bad Request",
    message: "Permintaan tidak valid. Silakan periksa kembali data yang dikirim.",
  },
  401: {
    title: "401 - Unauthorized",
    message: "Anda belum login atau tidak memiliki izin untuk mengakses halaman ini.",
  },
  403: {
    title: "403 - Forbidden",
    message: "Anda tidak memiliki hak akses ke halaman ini.",
  },
  404: {
    title: "404 - Not Found",
    message: "Halaman yang Anda cari tidak ditemukan.",
  },
};

export default function ErrorPages({ code }) {
  const error = errorMessages[code] || errorMessages[404];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 px-6 py-10 text-center">
      <FaExclamationTriangle className="text-6xl text-menu mb-6" />
      <h1 className="text-6xl font-extrabold text-gray-800">{code}</h1>
      <p className="mt-4 text-xl text-gray-600">{error.title}</p>
      <p className="text-gray-500 mt-2">{error.message}</p>

      <Link
        to="/"
        className="mt-6 inline-block bg-menu hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow transition duration-300"
        >
        Kembali ke Dashboard
      </Link>

      <img
        src="https://i.imgur.com/qIufhof.png"
        alt={`${code} Error`}
        className="mt-10 w-70"
      />
    </div>
  );
}
