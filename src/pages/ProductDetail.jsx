import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { BiChevronLeft } from "react-icons/bi";
import { products } from "../services/products"; // service fetch

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await products.fetchById(id); // dari service
        setProduct(data);
      } catch (err) {
        console.error("Gagal memuat produk:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-gray-500">Memuat detail produk...</div>;
  }

  if (!product) {
    return <div className="p-6 text-red-500">Produk tidak ditemukan.</div>;
  }

  return (
    <div id="product-detail" className="p-6 bg-[#E8DDD3] rounded-2xl">
      <Breadcrumb items={["Product", "Detail"]} />
      <button
        onClick={() => navigate("/product")}
        className="mt-4 mb-6 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition inline-flex items-center"
      >
        <BiChevronLeft className="text-xl mr-1" />
        Kembali
      </button>

      <h2 className="text-2xl font-semibold font-poppins mb-6">{product.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-poppins">
        <img
          src={product.image || "/images/default.png"}
          alt={product.name}
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />
        <div className="space-y-4 text-base">
          <p><strong>Kategori:</strong> {product.category}</p>
          <p><strong>Harga:</strong> Rp {Number(product.price).toLocaleString()}</p>
          <p><strong>Stok:</strong> {product.stock}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                product.status === "Tersedia"
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {product.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
