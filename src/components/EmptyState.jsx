import { BsDatabaseExclamation } from "react-icons/bs";

export default function EmptyState({ text = "Belum ada data" }) {
    return (
        <div className="p-10 text-center text-pink-400 bg-pink-50 rounded-2xl border border-pink-100">
            <div className="text-5xl mb-3 flex justify-center">
                <BsDatabaseExclamation />
            </div>
            <p className="text-base font-medium">{text}</p>
        </div>
    );
}
