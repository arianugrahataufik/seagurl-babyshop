import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Summary from "../components/Summary";
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";

export default function Dashboard() {
  return (
    <div className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Dashboard"]} />
      <Summary />
      <Banner />
    </div>
  );
}
