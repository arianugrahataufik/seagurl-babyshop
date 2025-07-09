import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { transaction as transactionService } from "../../services/transaction";

export default function Transactions() {
  const [transactionList, setTransactionList] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await transactionService.fetchAll();
        setTransactionList(data);
        setFilteredTransactions(data);
      } catch (err) {
        console.error("Gagal fetch transaksi:", err.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = transactionList.filter((t) =>
      t.customer?.name?.toLowerCase().includes(query)
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [searchQuery, transactionList]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentData = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus transaksi ini?");
    if (!confirm) return;

    try {
      await transactionService.delete(id);
      setTransactionList(transactionList.filter((t) => t.id !== id));
    } catch (err) {
      alert("Gagal menghapus transaksi: " + err.message);
    }
  };

  return (
    <div id="dashboard-container" className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Transaksi", "Daftar Transaksi"]} />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4">
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Cari transaksi"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border-2 border-kuning focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <button
          className="btn btn-outline btn-secondary rounded-xl"
          onClick={() => navigate("/transaction/create")}
        >
          Tambah Transaksi +
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full border rounded-xl overflow-hidden text-sm sm:text-base">
          <thead className="bg-pink-500 text-white font-poppins">
            <tr>
              <th className="py-3 px-4 text-left">NO</th>
              <th className="py-3 px-4 text-left">Tanggal</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((trx, index) => (
              <tr
                key={trx.id}
                className="border-b hover:bg-kuning/10 transition font-poppins"
                onClick={() => navigate(`/transaction/${trx.id}`)}
              >
                <td className="py-2 px-4">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-2 px-4">
                  {new Date(trx.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">{trx.customer?.name || "-"}</td>
                <td className="py-2 px-4">
                  Rp {Number(trx.total).toLocaleString()}
                </td>
                <td className="py-2 px-4 capitalize">{trx.status}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/transaction/edit/${trx.id}`);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(trx.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 italic"
                >
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
