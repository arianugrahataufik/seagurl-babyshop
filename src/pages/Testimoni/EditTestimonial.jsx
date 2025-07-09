import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { testimonial } from "../../services/testimonial";

export default function EditTestimonial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    rating: "",
    testimoni: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const data = await testimonial.fetchById(id);
        if (data) setForm(data);
      } catch (err) {
        setError("Gagal mengambil data testimoni.");
      }
    };
    fetchTestimonial();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await testimonial.update(id, form);
      navigate("/testimoni");
    } catch (err) {
      setError("Gagal menyimpan perubahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Testimoni", "Edit Testimoni"]} />
      <h2 className="text-2xl font-bold mb-4 mt-4">Edit Testimoni</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Nama</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-black"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Rating</label>
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-black"
          >
            <option value="">Pilih Rating</option>
            <option value="1">⭐ </option>
            <option value="2">⭐⭐ </option>
            <option value="3">⭐⭐⭐ </option>
            <option value="4">⭐⭐⭐⭐ </option>
            <option value="5">⭐⭐⭐⭐⭐ </option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Testimoni</label>
          <textarea
            name="testimoni"
            value={form.testimoni}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-black"
          />
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
