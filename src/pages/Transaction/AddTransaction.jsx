// CREATE TRANSACTION PAGE
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { transaction } from "../../services/transaction";
import { customers } from "../../services/customers";
import Breadcrumb from "../../components/Breadcrumb";

export default function AddTransaction() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customer_id: "",
    catatan: "",
    tanggal: new Date().toISOString().split("T")[0],
    total: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await customers.fetchAll();
        setCustomerList(data);
      } catch (err) {
        setError("Gagal memuat data customer");
      }
    };
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const newTransaction = {
        ...form,
        total: Number(form.total),
      };

      await transaction.create(newTransaction);
      navigate("/transaction");
    } catch (err) {
      setError("Gagal menyimpan transaksi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Transaction", "Tambah Transaksi"]} />
      <h2 className="text-2xl font-bold mt-4 mb-6">Tambah Transaksi Baru</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Customer</label>
          <select
            name="customer_id"
            value={form.customer_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-black"
          >
            <option value="">-- Pilih Customer --</option>
            {customerList.map((cust) => (
              <option key={cust.id} value={cust.id}>
                {cust.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Catatan</label>
            <input
              type="text"
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-black"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-black"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Total (Rp)</label>
          <input
            type="number"
            name="total"
            value={form.total}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-black"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-black"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          {loading ? "Menyimpan..." : "Simpan Transaksi"}
        </button>
      </form>
    </div>
  );
}
