import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { customers as customerService } from "../../services/customers"; // alias supaya rapi

export default function Customers() {
  const [customerList, setCustomerList] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await customerService.fetchAll(); // dari Supabase
        setCustomerList(data);
        setFilteredCustomers(data);
      } catch (err) {
        console.error("Gagal fetch customer:", err.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = customerList.filter((c) =>
      c.name?.toLowerCase().includes(query) ||
      c.email?.toLowerCase().includes(query) ||
      c.phone?.toLowerCase().includes(query)
    );
    setFilteredCustomers(filtered);
    setCurrentPage(1); // reset ke page 1 kalau search berubah
  }, [searchQuery, customerList]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentData = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus customer ini?");
    if (!confirm) return;

    try {
      await customerService.delete(id);
      setCustomerList(customerList.filter((c) => c.id !== id));
    } catch (err) {
      alert("Gagal menghapus customer: " + err.message);
    }
  };

  return (
    <div id="dashboard-container" className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Customer", "Customer List"]} />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4">
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search customer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border-2 border-kuning focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <button
          className="btn btn-outline btn-secondary rounded-xl"
          onClick={() => navigate("/customer/create")}
        >
          Tambah Customer +
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full border rounded-xl overflow-hidden text-sm sm:text-base">
          <thead className="bg-pink-500 text-white font-poppins">
            <tr>
              <th className="py-3 px-4 text-left">NO</th>
              <th className="py-3 px-4 text-left">Foto</th>
              <th className="py-3 px-4 text-left">Nama</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Member</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((customer, index) => (
              <tr
                key={customer.id}
                className="border-b hover:bg-kuning/10 transition font-poppins"
                onClick={() => navigate(`/customer/${customer.id}`)}
              >
                <td className="py-2 px-4">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-2 px-4">
                  {customer.photo ? (
                    <img
                      src={customer.photo}
                      alt={customer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>
                <td className="py-2 px-4">{customer.name}</td>
                <td className="py-2 px-4">{customer.email}</td>
                <td className="py-2 px-4">{customer.phone}</td>
                <td className="py-2 px-4 capitalize">{customer.member || "basic"}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/customer/edit/${customer.id}`);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(customer.id);
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
