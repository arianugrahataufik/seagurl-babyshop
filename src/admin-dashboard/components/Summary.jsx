import { FaShoppingCart, FaBaby, FaHeart, FaStar } from "react-icons/fa";

function SummaryCard({ icon: Icon, value, label, bgColor }) {
  return (
    <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out">
      <div className={`rounded-full p-4 ${bgColor}`}>
        <Icon className="text-3xl text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-barlow-bold">{value}</span>
        <span className="text-gray-400 font-poppins text-sm md:text-base">{label}</span>
      </div>
    </div>
  );
}

export default function Summary() {
  return (
    <div
      id="dashboard-grid"
      className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
    >
      <SummaryCard
        icon={FaShoppingCart}
        value="320"
        label="Products Sold"
        bgColor="bg-pink-400"
      />
      <SummaryCard
        icon={FaBaby}
        value="120"
        label="New Customers"
        bgColor="bg-blue-300"
      />
      <SummaryCard
        icon={FaHeart}
        value="58"
        label="Wishlist Items"
        bgColor="bg-purple-300"
      />
      <SummaryCard
        icon={FaStar}
        value="4.8/5"
        label="Product Ratings"
        bgColor="bg-yellow-400"
      />
    </div>
  );
}
