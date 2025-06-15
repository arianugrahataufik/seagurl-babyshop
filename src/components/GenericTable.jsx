export default function GenericTable({ columns, data, renderRow }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-100 text-sm text-gray-800">
        <thead className="bg-pink-100 text-gray-700 font-semibold">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-5 py-3 text-left whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-pink-50 transition-colors">
              {renderRow(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
