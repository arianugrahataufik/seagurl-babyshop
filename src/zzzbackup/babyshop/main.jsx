import { createRoot } from "react-dom/client";
import ArtikelDetail from "./ArtikelDetail";
import ListProduct from "./ListProduct";
import QnASection from "./QnASection";
import "./custom.css";

createRoot(document.getElementById("root")).render(
  <div>
    <div className="card2">
      <ArtikelDetail />
    </div>
    <div className="card2">
      <ListProduct />
    </div>
    <div className="card2">
      <QnASection />
    </div>
  </div>
);
