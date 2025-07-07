import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../services/products";
import { supabase } from "../../services/supabase";
import Breadcrumb from "../../components/Breadcrumb";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await products.fetchById(id);
        if (data) setForm(data);
      } catch (err) {
        setError("Gagal mengambil data produk");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewImage(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = form.image;
      if (newImage) {
        const { data, error: uploadError } = await supabase.storage
          .from("product-image")
          .upload(`product/${Date.now()}_${newImage.name}`, newImage);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("product-image")
          .getPublicUrl(data.path);

        imageUrl = urlData.publicUrl;
      }

      const updatedProduct = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        image: imageUrl,
      };

      await products.update(id, updatedProduct);
      navigate("/product");
    } catch (err) {
      setError("Gagal menyimpan perubahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Product", "Edit Produk"]} />
      <h2 className="text-2xl font-bold mb-4 mt-4">Edit Produk</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Nama Produk</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Harga</label>
            <input
              type="number"
              name="price"
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
              value={form.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-black"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Kategori</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-black"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Deskripsi</label>
          <textarea
            name="description"
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
          {form.image && !newImage && (
            <img src={form.image} alt="Preview" className="w-32 mt-2" />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
