export default function ResponsiveDesign() {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Contoh Responsive Design</h2>
        <div className="flex flex-col md:flex-row mb-4">
          <div className="bg-pink-300 p-4 w-full md:w-1/2">Sidebar</div>
          <div className="bg-purple-300 p-4 w-full md:w-1/2">Konten</div>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="bg-blue-200 p-4 text-center">
              Box {idx + 1}
            </div>
          ))}
        </div>
      </div>
    );
  }
  