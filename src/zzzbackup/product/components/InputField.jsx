export default function InputField({ label, type, placeholder, onChange, options,error }) {
    return (
      <div className="mb-3">
        <label className="block text-gray-700 font-bold mb-2">{label}</label>
  
        {type === "dropdown" ? (
          <select className="w-full p-4 border border-gray-600 rounded-2xl" onChange={onChange}>
            {options?.map((option) => (
              <option key={option.value} value={option.value} className="bg-red-200">
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full p-4 border border-gray-600 rounded-2xl hover:shadow-2xl"
          />
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
  