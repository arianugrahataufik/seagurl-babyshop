import { FaEdit, FaTrash } from "react-icons/fa";

export default function ProductsTable({ data }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border rounded-xl overflow-hidden text-sm sm:text-base">
        <thead className="bg-pink-500 text-white font-poppins">
          <tr>
            <th className="py-3 px-4 text-left">NO</th>
            <th className="py-3 px-4 text-left">Nama Produk</th>
            <th className="py-3 px-4 text-left">Kategori</th>
            <th className="py-3 px-4 text-left">Harga</th>
            <th className="py-3 px-4 text-left">Stok</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr
              key={product.id}
              className="border-b hover:bg-kuning/10 transition font-poppins"
            >
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.category}</td>
              <td className="py-2 px-4">Rp {product.price.toLocaleString()}</td>
              <td className="py-2 px-4">{product.stock}</td>
              <td className="py-2 px-4">
                {product.status === "Tersedia" ? (
                  <span className="bg-green-200 text-green-700 text-xs px-3 py-1 rounded-full">
                    Tersedia
                  </span>
                ) : (
                  <span className="bg-red-200 text-red-700 text-xs px-3 py-1 rounded-full">
                    Habis
                  </span>
                )}
              </td>
              <td className="py-2 px-4 text-center space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
