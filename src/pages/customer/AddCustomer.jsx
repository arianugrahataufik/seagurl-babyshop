// CREATE CUSTOMER PAGE
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { customers } from "../../services/customers";
import Breadcrumb from "../../components/Breadcrumb";

export default function AddCustomer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    member: "Bronze",
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let photoUrl = null;
      if (form.photo) {
        const { data, error: uploadError } = await supabase.storage
          .from("customer-photo")
          .upload(`photo/${Date.now()}_${form.photo.name}`, form.photo);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from("customer-photo")
          .getPublicUrl(data.path);
        photoUrl = urlData.publicUrl;
      }

      const newCustomer = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        member: form.member,
        photo: photoUrl,
      };

      await customers.create(newCustomer);
      navigate("/customer");
    } catch (err) {
      setError("Gagal menambahkan customer: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Customer", "Tambah Customer"]} />
      <h2 className="text-2xl font-bold mt-4 mb-6">Tambah Customer Baru</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Nama</label>
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
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-black"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Telepon</label>
            <input
              type="text"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-black"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Alamat</label>
          <textarea
            name="address"
            required
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-black"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Foto</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Member</label>
          <select
            name="member"
            value={form.member}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-black"
          >
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Sapphire">Sapphire</option>
            <option value="Emerald">Emerald</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          {loading ? "Menyimpan..." : "Simpan Customer"}
        </button>
      </form>
    </div>
  );
}
