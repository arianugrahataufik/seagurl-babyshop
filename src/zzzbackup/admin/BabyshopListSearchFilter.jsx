import React, { useState } from "react";
import data from "./babyshop.json";
import { Pencil, Trash2, Menu } from "lucide-react";

export default function BabyshopAdminDashboard() {
  const [filter, setFilter] = useState({
    search: "",
    category: "",
    brand: ""
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = [...new Set(data.map((item) => item.category))];
  const brands = [...new Set(data.map((item) => item.manufacturer.brand))];

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleEdit = (id) => {
    alert(`Edit produk ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Hapus produk ID: ${id}`);
  };

  const filtered = data.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(filter.search.toLowerCase()) ||
      item.description.toLowerCase().includes(filter.search.toLowerCase());

    const matchCategory = filter.category
      ? item.category === filter.category
      : true;

    const matchBrand = filter.brand
      ? item.manufacturer.brand === filter.brand
      : true;

    return matchSearch && matchCategory && matchBrand;
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-blue-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white shadow-md p-4 absolute md:relative z-10`}
      >
        <h2 className="text-xl font-bold text-pink-700 mb-6">Babyshop Admin</h2>
        <nav className="space-y-3">
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-pink-600">
            🛍️ Produk
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-pink-600">
            💳 Transaksi
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-pink-600">
            ⚙️ Pengaturan
          </a>
        </nav>
      </aside>

      {/* Konten utama */}
      <main className="flex-1 p-4 md:p-6">
        {/* Toggle untuk mobile */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-pink-700">Dashboard</h1>
          <button
            className="p-2 border rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-pink-700 mb-4">Manajemen Produk</h1>

        {/* Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            name="search"
            placeholder="Cari produk..."
            value={filter.search}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300"
          />
          <select
            name="category"
            value={filter.category}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            name="brand"
            value={filter.brand}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300"
          >
            <option value="">Semua Merek</option>
            {brands.map((b, idx) => (
              <option key={idx} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Tabel Produk */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-pink-100 text-pink-800">
              <tr>
                <th className="p-3 text-left">Gambar</th>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">Deskripsi</th>
                <th className="p-3 text-left">Merek</th>
                <th className="p-3 text-left">Kategori</th>
                <th className="p-3 text-left">Harga</th>
                <th className="p-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b hover:bg-pink-50">
                  <td className="p-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-2 font-semibold">{item.name}</td>
                  <td className="p-2">{item.description}</td>
                  <td className="p-2">{item.manufacturer.brand}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">Rp.{item.price.toLocaleString()}</td>
                  <td className="p-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="px-2 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded flex items-center gap-1"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-center py-4 text-gray-500">Produk tidak ditemukan.</p>
          )}
        </div>
      </main>
    </div>
  );
}
