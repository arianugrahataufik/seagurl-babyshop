export default function LoadingSpinner({ text = "Memuat data..." }) {
  return (
    <div className="py-10 flex flex-col items-center text-pink-500 text-sm font-medium">
      <div className="animate-spin h-10 w-10 border-4 border-pink-300 border-t-transparent rounded-full mb-4"></div>
      <p>{text}</p>
    </div>
  );
}
