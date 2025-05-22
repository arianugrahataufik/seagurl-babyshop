import InputField from "./components/InputField";
import Card from "./components/Card";

export default function UserForm() {
  return (
    <Card judul="Tambah User">
      <InputField
          label="Nama"
          type="text"
          placeholder="Silahkan ketik Nama..."
        />

        <InputField
          label="Email"
          type="email"
          placeholder="Silahkan ketik Email..."
        />

        <InputField label="Tanggal Lahir" type="date" />
        <button className="w-full bg-green-500 text-white p-2 rounded">
          Simpan
        </button>
    </Card>

  );
}
