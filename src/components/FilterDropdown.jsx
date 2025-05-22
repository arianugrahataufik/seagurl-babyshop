export default function FilterDropdown() {
    return (
      <div className="w-full sm:w-48">
        <select
          className="w-full px-4 py-2 rounded-xl border-2 border-kuning focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    );
  }
  