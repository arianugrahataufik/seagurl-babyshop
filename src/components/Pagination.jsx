export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  
    return (
      <div className="flex justify-end items-center space-x-2 mt-6">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-kuning text-white font-semibold disabled:bg-gray-300"
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md font-semibold ${
              page === currentPage
                ? "bg-pink-500 text-white"
                : "bg-kuning text-white"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-kuning text-white font-semibold disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    );
  }
  