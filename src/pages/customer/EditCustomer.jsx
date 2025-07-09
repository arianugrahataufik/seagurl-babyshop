import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { customers } from "../../services/customers";
import Breadcrumb from "../../components/Breadcrumb";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    member: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await customers.fetchById(id);
        if (data) setForm(data);
      } catch (err) {
        setError("Gagal mengambil data customer");
      }
    };
    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setNewPhoto(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let photoUrl = form.photo;
      if (newPhoto) {
        const { data, error: uploadError } = await supabase.storage
          .from("customer-photo")
          .upload(`customer/${Date.now()}_${newPhoto.name}`, newPhoto);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("customer-photo")
          .getPublicUrl(data.path);

        photoUrl = urlData.publicUrl;
      }

      const updatedCustomer = {
        ...form,
        photo: photoUrl,
      };

      await customers.update(id, updatedCustomer);
      navigate("/customer");
    } catch (err) {
      setError("Gagal menyimpan perubahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Customer", "Edit Customer"]} />
      <h2 className="text-2xl font-bold mb-4 mt-4">Edit Data Customer</h2>

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
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Telepon</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-black"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Membership</label>
            <input
              type="text"
              name="member"
              value={form.member}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-black"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Alamat</label>
          <textarea
            name="address"
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
          {form.photo && !newPhoto && (
            <img src={form.photo} alt="Preview" className="w-32 mt-2" />
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
