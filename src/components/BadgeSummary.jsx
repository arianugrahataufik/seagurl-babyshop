import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";

const badgeColors = {
  Platinum: "bg-purple-200 text-purple-800",
  Gold: "bg-yellow-200 text-yellow-800",
  Silver: "bg-gray-200 text-gray-800",
  Bronze: "bg-amber-200 text-amber-800",
};

const BadgeSummary = () => {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://9cbe48beb3fe.ngrok-free.app/badge-summary")
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error("Bukan JSON: " + text.substring(0, 100));
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setSummary(data.summary);
        } else {
          throw new Error("Response success: false");
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil data badge:", err);
        setError("Gagal memuat data badge.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">⏳ Loading badge summary...</p>;
  if (error) return <p className="text-center text-red-600">❌ {error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {Object.entries(summary).map(([badge, count]) => (
        <div
          key={badge}
          className={`p-4 rounded shadow text-center ${badgeColors[badge] || "bg-gray-200"}`}
        >
          <FaCrown className="text-xl mx-auto mb-2" />
          <p className="text-sm font-semibold">{badge} Members</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      ))}
    </div>
  );
};

export default BadgeSummary;
