import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { FaBackspace, FaBackward, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CRMedit() {
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    leads: 47,
    followedUp: 22,
    closedDeals: 12,
    campaigns: 2,
    segments: { emerald: 18, sapphire: 22, gold: 10 },
    satisfaction: { puas: 46, biasa: 3, tidakPuas: 6 },
    faq: [
      {
        question: "Bagaimana cara melihat status pesanan?",
        answer: "Masuk ke menu Riwayat Pembelian dan pilih produk.",
      },
      {
        question: "Apakah bisa bayar di tempat (COD)?",
        answer: "Ya, tersedia untuk area Pekanbaru dan sekitarnya.",
      },
      {
        question: "Produk bisa ditukar jika rusak?",
        answer: "Bisa, dalam 3x24 jam sejak penerimaan produk.",
      },
    ],
  });

  const handleChange = (e, section, key) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setData((prev) => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [key]: value,
          },
        };
      }
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleFAQChange = (i, field, value) => {
    const updated = [...data.faq];
    updated[i][field] = value;
    setData((prev) => ({ ...prev, faq: updated }));
  };

  return (
    <div className="p-6 bg-[#E8DDD3] rounded-2xl font-poppins">
      <Breadcrumb items={["CRM", "Edit"]} />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Edit CRM Data</h2>
        <button
          onClick={() => navigate("/crm")}
          className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          <FaBackward /> Back
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Data */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-pink-600">
            Sales Data
          </h3>
          <div className="grid gap-4">
            {["leads", "followedUp", "closedDeals"].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="number"
                  className="input border rounded-md w-full p-2"
                  value={data[key]}
                  onChange={(e) => handleChange(e, null, key)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-pink-600">
            Customer Segments
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(data.segments).map(([segment, value]) => (
              <div key={segment}>
                <label className="block text-sm font-medium mb-1 capitalize">
                  {segment}
                </label>
                <input
                  type="number"
                  className="input border rounded-md w-full p-2"
                  value={value}
                  onChange={(e) => handleChange(e, "segments", segment)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Campaigns */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-pink-600">
            Active Campaigns
          </h3>
          <input
            type="number"
            className="input border rounded-md w-full p-2"
            value={data.campaigns}
            onChange={(e) => handleChange(e, null, "campaigns")}
          />
        </div>

        {/* Satisfaction */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-pink-600">
            CS Satisfaction
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(data.satisfaction).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1 capitalize">
                  {key === "puas"
                    ? "Puas"
                    : key === "biasa"
                    ? "Biasa"
                    : "Tidak Puas"}
                </label>
                <input
                  type="number"
                  className="input border rounded-md w-full p-2"
                  value={value}
                  onChange={(e) => handleChange(e, "satisfaction", key)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-pink-600">
            FAQ Interaksi
          </h3>
          {data.faq.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pertanyaan
                </label>
                <input
                  type="text"
                  className="input border rounded-md w-full p-2"
                  value={item.question}
                  onChange={(e) =>
                    handleFAQChange(i, "question", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Jawaban
                </label>
                <input
                  type="text"
                  className="input border rounded-md w-full p-2"
                  value={item.answer}
                  onChange={(e) => handleFAQChange(i, "answer", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
