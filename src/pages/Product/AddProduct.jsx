import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../../services/products";
import { supabase } from "../../services/supabase"; // koneksi supabase-mu
import Breadcrumb from "../../components/Breadcrumb";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = null;

      if (form.image) {
        const { data, error: uploadError } = await supabase.storage
          .from("product-image")
          .upload(`product/${Date.now()}_${form.image.name}`, form.image);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("product-image")
          .getPublicUrl(data.path);

        imageUrl = urlData.publicUrl;
      }

      const newProduct = {
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        description: form.description,
        image: imageUrl,
      };

      await products.create(newProduct);
      navigate("/product");
    } catch (err) {
      setError("Gagal menyimpan produk: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Product", "Tambah Produk"]} />

      <h2 className="text-2xl font-bold mb-4 mt-4">Tambah Produk Baru</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Nama Produk</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Harga</label>
            <input
              type="numeric"
              name="price"
              required
              value={form.price}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-black"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Stok</label>
            <input
              type="number"
              name="stock"
              required
              value={form.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-black"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Kategori</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-black"
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="Pakaian Bayi">Pakaian Bayi</option>
            <option value="Peralatan Mandi">Peralatan Mandi</option>
            <option value="Popok & Tisu Basah">Popok & Tisu Basah</option>
            <option value="Perlengkapan Makan">Perlengkapan Makan</option>
            <option value="Mainan & Edukasi">Mainan & Edukasi</option>
            <option value="Tempat Tidur">Tempat Tidur</option>
            <option value="Perlengkapan Jalan">Perlengkapan Jalan</option>
            <option value="Perawatan Bayi">Perawatan Bayi</option>
            <option value="Perlengkapan Ibu">Perlengkapan Ibu</option>
            <option value="Pembersih & Kebersihan">
              Pembersih & Kebersihan
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Deskripsi</label>
          <textarea
            name="description"
            required
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-black"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Gambar Produk</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          {loading ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </form>
    </div>
  );
}
