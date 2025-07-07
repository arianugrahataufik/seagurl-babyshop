import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import FilterDropdown from "../../components/FilterDropdown";
import Pagination from "../../components/Pagination";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { products as productService } from "../../services/products"; // rename alias agar tidak bentrok

export default function Products() {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productService.fetchAll(); // Ambil dari Supabase
        setProductList(data);
      } catch (err) {
        console.error("Gagal fetch produk:", err.message);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(productList.length / itemsPerPage);
  const currentData = productList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus produk ini?");
    if (!confirm) return;

    try {
      await productService.delete(id);
      setProductList(productList.filter((p) => p.id !== id)); // update list
    } catch (err) {
      alert("Gagal menghapus produk: " + err.message);
    }
  };

  return (
    <div id="dashboard-container" className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Product", "Product List"]} />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4">
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search here"
            className="w-full px-4 py-2 rounded-xl border-2 border-kuning focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <button
          className="btn btn-outline btn-secondary rounded-xl"
          onClick={() => navigate("/product/create")}
        >
          Tambah Produk +
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full border rounded-xl overflow-hidden text-sm sm:text-base">
          <thead className="bg-pink-500 text-white font-poppins">
            <tr>
              <th className="py-3 px-4 text-left">NO</th>
              <th className="py-3 px-4 text-left">Nama Produk</th>
              <th className="py-3 px-4 text-left">Harga</th>
              <th className="py-3 px-4 text-left">Stok</th>
              <th className="py-3 px-4 text-left">Kategori</th>
              <th className="py-3 px-4 text-left">Deskripsi</th>
              <th className="py-3 px-4 text-left">Gambar</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((products, index) => (
              <tr
                key={products.id}
                className="border-b hover:bg-kuning/10 transition font-poppins"
                onClick={() => navigate(`/product/${products.id}`)}
              >
                <td className="py-2 px-4">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-2 px-4">{products.name}</td>
                <td className="py-2 px-4">
                  Rp {Number(products.price).toLocaleString()}
                </td>
                <td className="py-2 px-4">{products.stock}</td>
                <td className="py-2 px-4">{products.category}</td>
                <td className="py-2 px-4">{products.description}</td>
                <td className="py-2 px-4">
                  {products.image ? (
                    <img
                      src={products.image}
                      alt={products.name}
                      className="w-16 h-16 object-cover rounded-lg shadow"
                    />
                  ) : (
                    <span className="text-gray-500 italic">No image</span>
                  )}
                </td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/edit/${products.id}`);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // supaya tidak navigate ke detail
                      handleDelete(products.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
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
