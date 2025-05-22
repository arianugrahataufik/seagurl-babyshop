import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import ProductsTable from "../components/ProductsTable";
import Pagination from "../components/Pagination";

import productsData from "../data/products.json";
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentData = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div id="dashboard-container" className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Product","Product List"]}/>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4">
        <SearchBar />
        <FilterDropdown />
      </div>

      <ProductsTable data={currentData} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
