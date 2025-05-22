import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import CustomersTable from "../components/CustomersTable";
import Pagination from "../components/Pagination";

import customersData from "../data/customers.json";
import Breadcrumb from "../components/Breadcrumb";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      <Breadcrumb items={["Customer", "Customer List"]}/>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4">
        <SearchBar />
        <FilterDropdown />
      </div>

      <CustomersTable data={currentData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
