import { createRoot } from "react-dom/client";
import TailwindCSS from "./TailWindCSS";
import UserForm from "./UserForm";
import HitungGajiForm from "./HitungGajiForm";
import './tailwind.css';

createRoot(document.getElementById("root"))
    .render(
        <div className="ml-8">
        <TailwindCSS/>
        <UserForm/>
        <HitungGajiForm/>
        </div>
    )