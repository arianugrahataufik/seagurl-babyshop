import { FaEdit, FaTrash } from "react-icons/fa";

export default function CustomersTable({ data }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border rounded-xl overflow-hidden">
        <thead className="bg-menu text-white font-poppins">
          <tr>
            <th className="py-3 px-4 text-left">NO</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customers, index) => (
            <tr
              key={customers.id}
              className="border-b hover:bg-kuning/10 transition font-poppins"
            >
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{customers.name}</td>
              <td className="py-2 px-4">{customers.email}</td>
              <td className="py-2 px-4">{customers.phone}</td>
              <td className="py-2 px-4">
                {customers.status === "Active" ? (
                  <span className="bg-green-200 text-green-700 text-xs px-3 py-1 rounded-full">
                    Active
                  </span>
                ) : (
                  <span className="bg-red-200 text-red-700 text-xs px-3 py-1 rounded-full">
                    Inactive
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
