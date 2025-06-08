import { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb";
import { BsFillExclamationDiamondFill } from "react-icons/bs";

export default function Quotes() {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");
  const [trigger, setTrigger] = useState(0); // agar bisa retrigger useEffect

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios
        .get("https://api.quotable.io/random")
        .then((response) => {
          if (response.status !== 200 || !response.data.content) {
            setError("Gagal mengambil kutipan");
            return;
          }
          // Sesuaikan struktur dengan {q, a}
          setQuote({ q: response.data.content, a: response.data.author });
          setError("");
        })
        .catch((err) => {
          setError(err.message || "Terjadi kesalahan jaringan");
        });
    }, 500); // 500ms debounce

    return () => clearTimeout(timeout); // cleanup
  }, [trigger]); // tergantung pada trigger, bukan query

  const handleNewQuote = () => {
    setTrigger((prev) => prev + 1); // trigger ulang useEffect
  };

  const errorInfo = error ? (
    <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
      <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
      {error}
    </div>
  ) : null;

  return (
    <div id="dashboard-container" className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Quotes"]} />

      {errorInfo}

      <div className="text-center my-6">
        {!quote && !error && <p className="text-gray-600">Memuat kutipan...</p>}
        {quote && (
          <>
            <blockquote className="italic text-xl text-gray-800 mb-2">
              "{quote.q}"
            </blockquote>
            <p className="text-md text-gray-700 font-semibold">— {quote.a}</p>
          </>
        )}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleNewQuote}
          className="bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 rounded-full transition"
        >
          Ambil Kutipan Baru
        </button>
      </div>
    </div>
  );
}
