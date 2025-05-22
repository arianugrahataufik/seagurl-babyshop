export default function InputField({label, type, placeholder, onChange}){
    return (
        <div className="mb-3">
            <label className="black text-gray-700 font-medium mb-1">{label}</label>
            <input 
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded"
            />
            <type  
            />
        </div>
    )
}