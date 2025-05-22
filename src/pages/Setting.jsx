import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Setting() {
    return (
        <div id="dashboard-container" className="p-4 sm:p-6">
            <PageHeader title="Setting" currentPage="Setting Panel"/>
          <div>Setting <i class="fas fa-star-exclamation fa-xs fa-fw"></i></div>
        </div>
    );
}