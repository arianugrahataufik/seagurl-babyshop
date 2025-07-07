import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { BiChevronLeft, BiEdit } from "react-icons/bi";
import { products } from "../../services/products";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await products.fetchById(id);
        setProduct(data);
      } catch (err) {
        console.error("Gagal memuat produk:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6 text-gray-500">Memuat detail produk...</div>;
  if (!product) return <div className="p-6 text-red-500">Produk tidak ditemukan.</div>;

  return (
    <div className="p-6 bg-[#E8DDD3] rounded-2xl font-poppins">
      <Breadcrumb items={["Product", "Detail"]} />

      <div className="flex justify-between items-center mt-4 mb-6">
        <button
          onClick={() => navigate("/product")}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition inline-flex items-center"
        >
          <BiChevronLeft className="text-xl mr-1" />
          Kembali
        </button>
        <button
          onClick={() => navigate(`/product/edit/${product.id}`)}
          className="text-sm text-pink-500 hover:underline flex items-center"
        >
          <BiEdit className="mr-1" /> Edit Produk
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image || "/images/default.png"}
            alt={product.name}
            className="w-full max-h-[400px] object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-2xl text-pink-600 font-semibold">
            Rp {Number(product.price).toLocaleString()}
          </p>
          <p><span className="font-semibold">Kategori:</span> {product.category}</p>
          <p><span className="font-semibold">Stok:</span> {product.stock}</p>
          <div>
            <span className="font-semibold block mb-1">Deskripsi:</span>
            <p className="bg-white p-4 rounded-lg text-sm text-gray-700 shadow-inner">{product.description}</p>
          </div>
          <div>
            <span className="font-semibold">Status:</span>{" "}
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              product.stock > 0 ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
            }`}>
              {product.stock > 0 ? "Tersedia" : "Habis"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
