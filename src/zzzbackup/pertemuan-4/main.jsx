import { createRoot } from "react-dom/client";
import FrameworkList from "./FrameworkList";
import './tailwind.css';
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import ResponsiveDesign from "./ResponsiveDesign";

createRoot(document.getElementById("root"))
    .render(
        <div className="ml-8">
        <FrameworkListSearchFilter/>
        {/* <FrameworkList/> */}
        {/* <ResponsiveDesign/> */}
        </div>
    )