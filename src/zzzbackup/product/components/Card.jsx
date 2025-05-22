export default function Card({ judul, children }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 bg-gradient-to-r from-yellow-100 to-pink-300 rounded-lg">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 hover:shadow-2xl transition">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          {judul}
        </h2>
        {children}
      </div>
    </div>
  );
}
