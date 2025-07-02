import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import FilterDropdown from "../components/FilterDropdown";
import Pagination from "../components/Pagination";
import Breadcrumb from "../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { products as productService } from "../services/products"; // rename alias agar tidak bentrok

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

  return (
    <div id="dashboard-container" className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Product", "Product List"]} />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4">
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="search here"
            className="w-full px-4 py-2 rounded-xl border-2 border-kuning focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <FilterDropdown />
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full border rounded-xl overflow-hidden text-sm sm:text-base">
          <thead className="bg-pink-500 text-white font-poppins">
            <tr>
              <th className="py-3 px-4 text-left">NO</th>
              <th className="py-3 px-4 text-left">Nama Produk</th>
              <th className="py-3 px-4 text-left">Kategori</th>
              <th className="py-3 px-4 text-left">Harga</th>
              <th className="py-3 px-4 text-left">Stok</th>
              <th className="py-3 px-4 text-left">Status</th>
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
                <td className="py-2 px-4">{products.category}</td>
                <td className="py-2 px-4">
                  Rp {Number(products.price).toLocaleString()}
                </td>
                <td className="py-2 px-4">{products.stock}</td>
                <td className="py-2 px-4">
                  {products.status === "Tersedia" ? (
                    <span className="bg-green-200 text-green-700 text-xs px-3 py-1 rounded-full">
                      Tersedia
                    </span>
                  ) : (
                    <span className="bg-red-200 text-red-700 text-xs px-3 py-1 rounded-full">
                      Habis
                    </span>
                  )}
                </td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
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
