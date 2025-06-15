import { useEffect, useState } from "react";
import { user } from "../services/user";
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import { AiFillDelete } from "react-icons/ai";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function User() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState([]);

  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    birth: "",
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await user.fetchUser(); // pakai axios
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data pengguna");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      await user.createUser(dataForm); // pakai axios
      setSuccess("Pengguna berhasil ditambahkan!");
      setDataForm({ name: "", email: "", birth: "" });
      setTimeout(() => setSuccess(""), 3000);
      loadUsers();
    } catch (err) {
      console.error(err);
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus user ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      await user.deleteUser(id); // pakai axios
      loadUsers();
    } catch (err) {
      console.error(err);
      setError(`Gagal menghapus user: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Data Pengguna</h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tambah Pengguna Baru</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={dataForm.name}
            placeholder="Nama lengkap"
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:ring-pink-400"
          />
          <input
            type="email"
            name="email"
            value={dataForm.email}
            placeholder="Alamat email"
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:ring-pink-400"
          />
          <input
            type="date"
            name="birth"
            value={dataForm.birth}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:ring-pink-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-2xl"
          >
            {loading ? "Mohon Tunggu..." : "Tambah User"}
          </button>
        </form>

        {/* Tabel pengguna */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold">Daftar Pengguna ({users.length})</h3>

          {loading && <LoadingSpinner text="Memuat data pengguna..." />}

          {!loading && users.length === 0 && !error && (
            <EmptyState text="Belum ada data pengguna." />
          )}
          {!loading && users.length > 0 && (
            <GenericTable
              columns={["#", "Nama", "Email", "Lahir", "Aksi"]}
              data={users}
              renderRow={(user, index) => (
                <>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-gray-700">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-gray-600">{user.birth}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(user.id)} disabled={loading}>
                      <AiFillDelete className="text-red-500 text-xl hover:text-red-700 transition-colors" />
                    </button>
                  </td>
                </>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
