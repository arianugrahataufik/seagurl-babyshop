import { useParams, useNavigate } from "react-router-dom";
import customersData from "../data/customers.json";
import Breadcrumb from "../components/Breadcrumb";
import { BiChevronLeft } from "react-icons/bi";

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = customersData.find((c) => c.id === parseInt(id));

  if (!customer) {
    return <div className="p-6">Customer tidak ditemukan.</div>;
  }

  return (
    <div className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Customer", "Detail"]} />

      {/* Tombol kembali */}
      <button
        onClick={() => navigate("/customer")}
        className="mt-4 mb-6 px-4 py-2 bg-menu text-white rounded-lg hover:bg-pink-600 transition"
      >
       <BiChevronLeft />
      </button>

      <h2 className="text-2xl font-semibold font-poppins mb-6">
        {customer.name}
      </h2>

      <div className="font-poppins space-y-4 text-base">
        <p><strong>Nama:</strong> {customer.name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Telepon:</strong> {customer.phone}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              customer.status === "Active"
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }`}
          >
            {customer.status}
          </span>
        </p>
      </div>
    </div>
  );
}
