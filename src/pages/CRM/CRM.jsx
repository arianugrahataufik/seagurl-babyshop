import { useEffect, useState } from "react";
// Tambahkan di bagian import
import {
  FaChartPie,
  FaBullhorn,
  FaUserCheck,
  FaQuestionCircle,
  FaEdit,
  FaStar,
  FaCrown,
  FaGem,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function CRM() {
  const navigate = useNavigate();

  // Dummy data
  const [leadStats] = useState([
    { name: "Leads", value: 47 },
    { name: "Followed Up", value: 22 },
    { name: "Closed", value: 12 },
  ]);

  const [satisfactionStats] = useState([
    { name: "Puas", value: 46 },
    { name: "Biasa", value: 3 },
    { name: "Tidak Puas", value: 6 },
  ]);

  const COLORS = ["#10B981", "#FBBF24", "#EF4444"];

  return (
    <div className="p-6 bg-[#E8DDD3] rounded-2xl font-poppins">
      <Breadcrumb items={["Summary"]} />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Overview</h2>
        <button
          onClick={() => navigate("/crm/edit")}
          className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          <FaEdit /> Edit Dummy Data
        </button>
      </div>

      {/* Section 1: Sales Force Automation */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <FaUserCheck className="text-pink-600" /> Sales Automation
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={leadStats}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#EC4899" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Section 2: Marketing Automation */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <FaBullhorn className="text-pink-600" /> Marketing Automation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow p-4">
            <h4 className="text-lg font-semibold mb-3">Active Campaigns</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-pink-50 rounded-md">
                <span className="font-medium text-sm text-pink-700">
                  Promo Bayi Ceria
                </span>
                <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                  Running
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-pink-50 rounded-md">
                <span className="font-medium text-sm text-pink-700">
                  Diskon Popok Mingguan
                </span>
                <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                  Running
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h4 className="text-lg font-semibold mb-2">Customer Segments</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-emerald-600">
                <FaCrown /> <span>Emerald Member (18)</span>
              </li>
              <li className="flex items-center gap-2 text-blue-600">
                <FaGem /> <span>Sapphire Member (22)</span>
              </li>
              <li className="flex items-center gap-2 text-yellow-500">
                <FaStar /> <span>Gold Member (10)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 3: Service Automation */}
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <FaQuestionCircle className="text-pink-600" /> Service Automation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow p-4">
            <h4 className="text-lg font-semibold mb-4">FAQ Interaksi</h4>
            <ul className="divide-y divide-gray-200">
              <li className="py-2">
                <strong className="text-pink-600">Q:</strong> Bagaimana cara
                melihat status pesanan?
                <p className="text-sm text-gray-600">
                  <strong>A:</strong> Masuk ke menu Riwayat Pembelian dan pilih
                  produk.
                </p>
              </li>
              <li className="py-2">
                <strong className="text-pink-600">Q:</strong> Apakah bisa bayar
                di tempat (COD)?
                <p className="text-sm text-gray-600">
                  <strong>A:</strong> Ya, tersedia untuk area Pekanbaru dan
                  sekitarnya.
                </p>
              </li>
              <li className="py-2">
                <strong className="text-pink-600">Q:</strong> Produk bisa
                ditukar jika rusak?
                <p className="text-sm text-gray-600">
                  <strong>A:</strong> Bisa, dalam 3x24 jam sejak penerimaan
                  produk.
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h4 className="text-lg font-semibold">CS Satisfaction Breakdown</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={satisfactionStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {satisfactionStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
