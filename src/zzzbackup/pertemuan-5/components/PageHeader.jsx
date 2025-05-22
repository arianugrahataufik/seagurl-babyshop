export default function PageHeader({ title, currentPage = "Overview" }) {
  return (
    <div
      id="pageheader-container"
      className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 sm:px-6 lg:px-8"
    >
      {/* Title & Breadcrumb */}
      <div id="pageheader-left" className="flex flex-col space-y-1">
        <span
          id="page-title"
          className="text-2xl sm:text-3xl font-poppins-bold text-gray-800"
        >
          {title}
        </span>
        <div
          id="breadcrumb-links"
          className="flex items-center font-medium space-x-2 text-sm text-gray-500"
        >
          <span id="breadcrumb-home">Dashboard</span>
          <span id="breadcrumb-separator">/</span>
          <span id="breadcrumb-current">{currentPage}</span>
        </div>
      </div>

      {/* Optional Right Side (Button/Action) */}
      {/* <div>
        <button className="text-sm text-white bg-primary px-4 py-2 rounded-md hover:bg-opacity-80 transition">
          + Add New
        </button>
      </div> */}
    </div>
  );
}
