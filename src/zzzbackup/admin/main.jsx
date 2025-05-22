import { createRoot } from "react-dom/client";
import './tailwind.css';
import BabyshopListSearchFilter from "./BabyshopListSearchFilter";
import ResponsiveDesign from "./ResponsiveDesign";

createRoot(document.getElementById("root")).render(
  <div className="bg-gray-100 min-h-screen p-4">
    <BabyshopListSearchFilter />
    {/* <ResponsiveDesign /> */}
  </div>
);
