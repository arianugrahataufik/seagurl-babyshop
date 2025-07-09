import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Summary from "../components/Summary";
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";
import SalesFunnelCard from "../components/CRM/SalesFunnelCard";
import CampaignPreview from "../components/CRM/CampaignPreview";
import CSSatisfaction from "../components/CRM/CSSatisfactionChart";

export default function Dashboard() {
  return (
    <div className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Dashboard"]} />  
      <Summary />
      <Banner />
      {/* <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4">
        <SalesFunnelCard />
        <CampaignPreview />
        <CSSatisfaction />
      </div> */}
    </div>
  );
}