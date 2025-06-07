import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Banner from "../components/Banner";
import Summary from "../components/Summary";

export default function Dashboard() {
    return (
        <div id="dashboard-container">
            <PageHeader title="Dashboard" />
            <Summary/>
            <Banner/>
        </div>
    );
}