import { useEffect, useState } from "react";
import { review } from "../services/review";
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import { AiFillDelete } from "react-icons/ai";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function Review() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reviews, setReviews] = useState([]);

  const [dataForm, setDataForm] = useState({
    name: "",
    description: "",
  });

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await review.fetchReview();
      setReviews(data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data review");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
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
      await review.createReview(dataForm);
      setSuccess("Review berhasil ditambahkan!");
      setDataForm({ name: "", description: "" });
      setTimeout(() => setSuccess(""), 3000);
      loadReviews();
    } catch (err) {
      console.error(err);
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus review ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      await review.deleteReview(id);
      loadReviews();
    } catch (err) {
      setError(`Gagal menghapus review: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Data Review</h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tambah Review Baru</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={dataForm.name}
            placeholder="Nama pengulas"
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:ring-indigo-500"
          />
          <textarea
            name="description"
            value={dataForm.description}
            placeholder="Isi review"
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl"
          >
            {loading ? "Mohon Tunggu..." : "Tambah Review"}
          </button>
        </form>

        <div className="mt-10">
          <h3 className="text-lg font-semibold">Daftar Review ({reviews.length})</h3>

          {loading && <LoadingSpinner text="Memuat data review..." />}

          {!loading && reviews.length === 0 && !error && (
            <EmptyState text="Belum ada data review." />
          )}
          {!loading && reviews.length > 0 && (
            <GenericTable
              columns={["#", "Nama", "Review", "Tanggal", "Aksi"]}
              data={reviews}
              renderRow={(item, index) => (
                <>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-gray-700">{item.name}</td>
                  <td className="px-6 py-4 text-gray-600">{item.description}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(item.created_at).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(item.id)} disabled={loading}>
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
