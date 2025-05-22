export default function SearchBar({ placeholder = "Search here..." }) {
    return (
      <div className="w-full sm:w-64">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-4 py-2 rounded-xl border-2 border-kuning focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>
    );
  }
  