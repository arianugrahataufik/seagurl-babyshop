import { useState } from "react";
import { FaCrown, FaSpinner } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const badgeStyles = {
  Platinum: "bg-purple-200 text-purple-800",
  Gold: "bg-yellow-200 text-yellow-800",
  Silver: "bg-gray-200 text-gray-800",
  Bronze: "bg-amber-200 text-amber-800",
  Unknown: "bg-red-200 text-red-800",
};

const COLORS = ["#a855f7", "#facc15", "#9ca3af", "#f59e0b"]; // urutan: Platinum, Gold, Silver, Bronze

const formatRupiah = (value) => {
  if (!value) return "Rp 0";
  return "Rp " + parseInt(value).toLocaleString("id-ID");
};

const PredictBadge = () => {
  const [formData, setFormData] = useState({
    total_transaksi: "",
    total_nilai_transaksi: "",
    rata_rata_belanja: "",
    frekuensi_belanja: "",
    lama_bergabung: "",
    hari_sejak_terakhir_belanja: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/[^\d.]/g, "");
    setFormData((prev) => ({ ...prev, [name]: cleanValue }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        "https://9cbe48beb3fe.ngrok-free.app/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            total_transaksi: parseInt(formData.total_transaksi),
            total_nilai_transaksi: parseInt(formData.total_nilai_transaksi),
            rata_rata_belanja: parseFloat(formData.rata_rata_belanja),
            frekuensi_belanja: parseFloat(formData.frekuensi_belanja),
            lama_bergabung: parseInt(formData.lama_bergabung),
            hari_sejak_terakhir_belanja: parseInt(
              formData.hari_sejak_terakhir_belanja
            ),
          }),
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Gagal memanggil API." });
    }

    setLoading(false);
  };

  // Convert probability to chart data
  const badgeChartData = result?.probabilities
    ? Object.entries(result.probabilities).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">
        🍼 Prediksi Badge Membership
      </h2>

      <div className="bg-white rounded shadow p-6 grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Total Transaksi
          </label>
          <input
            type="numeric"
            name="total_transaksi"
            value={formData.total_transaksi}
            onChange={handleChange}
            placeholder="Contoh: 15"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Total Nilai Transaksi
          </label>
          <input
            type="text"
            name="total_nilai_transaksi"
            value={formData.total_nilai_transaksi}
            onChange={handleChange}
            placeholder="Contoh: 500000"
            className="w-full p-2 border rounded"
          />
          <p className="text-sm text-gray-400 mt-1">
            {formatRupiah(formData.total_nilai_transaksi)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Rata-rata Belanja
          </label>
          <input
            type="text"
            name="rata_rata_belanja"
            value={formData.rata_rata_belanja}
            onChange={handleChange}
            placeholder="Contoh: 100000"
            className="w-full p-2 border rounded"
          />
          <p className="text-sm text-gray-400 mt-1">
            {formatRupiah(formData.rata_rata_belanja)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Frekuensi Belanja per Bulan
          </label>
          <input
            type="numeric"
            name="frekuensi_belanja"
            value={formData.frekuensi_belanja}
            onChange={handleChange}
            placeholder="Contoh: 2.5"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Lama Bergabung (dalam hari)
          </label>
          <input
            type="numeric"
            name="lama_bergabung"
            value={formData.lama_bergabung}
            onChange={handleChange}
            placeholder="Contoh: 365"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Hari Sejak Terakhir Belanja
          </label>
          <input
            type="numeric"
            name="hari_sejak_terakhir_belanja"
            value={formData.hari_sejak_terakhir_belanja}
            onChange={handleChange}
            placeholder="Contoh: 10"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={handlePredict}
          disabled={loading}
          className={`mt-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2 justify-center">
              <FaSpinner className="animate-spin" /> Memproses...
            </span>
          ) : (
            "Prediksi"
          )}
        </button>
      </div>

      {result && (
        <div className="mt-8 p-6 rounded shadow bg-gray-50 text-center">
          {result.success ? (
            <>
              <p className="text-xl mb-2">🎉 Hasil Prediksi:</p>
              <div
                className={`inline-flex items-center gap-3 px-4 py-2 rounded-full font-semibold text-lg ${
                  badgeStyles[result.label] || badgeStyles.Unknown
                }`}
              >
                <FaCrown />
                {result.label} Member
              </div>
              {/* <p className="mt-2 text-gray-500 text-sm">
                (Kode badge: {result.encoded})
              </p> */}

              {/* Insight Otomatis */}
              <p className="mt-4 text-md text-gray-700 italic">
                {result.label === "Platinum" &&
                  "🎉 Pelanggan sangat loyal! Berikan penghargaan eksklusif seperti diskon VIP atau undangan acara khusus."}
                {result.label === "Gold" &&
                  "💛 Pelanggan aktif dan sering belanja. Pertahankan dengan program loyalitas berkelanjutan."}
                {result.label === "Silver" &&
                  "💡 Pelanggan lumayan aktif, tapi masih bisa ditingkatkan. Berikan penawaran menarik atau cashback."}
                {result.label === "Bronze" &&
                  "🔍 Aktivitas pelanggan masih rendah. Coba kirim reminder promo atau voucher spesial untuk mengajak kembali."}
              </p>

              {/* 🎯 Pie Chart */}
              {badgeChartData.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-600">
                    🔍 Probabilitas Setiap Badge
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={badgeChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, value }) =>
                          `${name} (${(value * 100).toFixed(1)}%)`
                        }
                      >
                        {badgeChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </>
          ) : (
            <p className="text-red-600 font-semibold">
              ❌ {result.error || "Prediksi gagal"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictBadge;
