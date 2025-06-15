export default function AlertBox({ type = "info", children }) {
  const baseClass =
    "px-5 py-4 rounded-xl mb-6 shadow-md border text-sm font-medium flex items-center gap-3";

  const styles = {
    success: "bg-emerald-50 border-emerald-300 text-emerald-800",
    error: "bg-red-50 border-red-300 text-red-800",
    info: "bg-blue-50 border-blue-300 text-blue-800",
  };

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
  };

  return (
    <div className={`${baseClass} ${styles[type] || styles.info}`}>
      <span>{icons[type] || icons.info}</span>
      <span>{children}</span>
    </div>
  );
}
