import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import Pagination from "../components/Pagination";
import customersData from "../data/customers.json";
import Breadcrumb from "../components/Breadcrumb";
import { Navigate, useNavigate } from "react-router-dom";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    setCustomers(customersData);
  }, []);

  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const currentData = customers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div id="dashboard-container" className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Customer", "Customer List"]} />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4">
        <SearchBar />
        <FilterDropdown />
      </div>

      {/* CustomersTable merged below */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full border rounded-xl overflow-hidden">
          <thead className="bg-menu text-white font-poppins">
            <tr>
              <th className="py-3 px-4 text-left">NO</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((customer, index) => (
              <tr
                key={customer.id}
                className="border-b hover:bg-kuning/10 transition font-poppins"
                onClick={() => navigate(`/customer/${customer.id}`)}
              >
                <td className="py-2 px-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="py-2 px-4">{customer.name}</td>
                <td className="py-2 px-4">{customer.email}</td>
                <td className="py-2 px-4">{customer.phone}</td>
                <td className="py-2 px-4">
                  {customer.status === "Active" ? (
                    <span className="bg-green-200 text-green-700 text-xs px-3 py-1 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-200 text-red-700 text-xs px-3 py-1 rounded-full">
                      Inactive
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
