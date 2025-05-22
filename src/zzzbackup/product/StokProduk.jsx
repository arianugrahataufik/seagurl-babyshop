import Card from "./components/Card";
import InputField from "./components/InputField";
import FlexboxGrid from "./components/FlexboxGrid";
import { useState, useEffect } from "react";

export default function StokProduk() {
  // State untuk input
  const [namaProduk, setNamaProduk] = useState("");
  const [kodeProduk, setKodeProduk] = useState("");
  const [namaSupplier, setNamaSupplier] = useState("");
  const [kategori, setKategori] = useState("");
  const [errors, setErrors] = useState({});

  const [total, setTotal] = useState(0);

  // Fungsi untuk validasi
  const validate = () => {
    let tempErrors = {};
    if (!namaProduk.trim()) tempErrors.namaProduk = "Nama produk wajib diisi!";
    if (!kodeProduk.trim()) tempErrors.kodeProduk = "Kode produk wajib diisi!";
    else if (isNaN(kodeProduk))
      tempErrors.kodeProduk = "Kode produk hanya boleh angka!";
    if (!namaSupplier.trim())
      tempErrors.namaSupplier = "Nama supplier wajib diisi!";
    if (!kategori) tempErrors.kategori = "Pilih kategori produk!";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // True jika tidak ada error
  };

  const isFormValid = () => {
    return (
      namaProduk &&
      kodeProduk &&
      namaSupplier &&
      kategori &&
      Object.keys(errors).length === 0
    );
  };

  const handleSubmit = () => {
    if (validate()) {
      setTotal(total + 1);
    }
  };

  useEffect(() => {
    validate();
  }, [namaProduk, kodeProduk, namaSupplier, kategori]);

  return (
    <div>
      <FlexboxGrid />
      <Card judul="Tambah Stok Produk">
        <InputField
          label="Nama Produk"
          type="text"
          placeholder="Masukkan nama produk..."
          value={namaProduk}
          onChange={(e) => setNamaProduk(e.target.value)}
          error={errors.namaProduk}
        />
        <InputField
          label="Kode Produk"
          type="text"
          placeholder="Masukkan kode produk..."
          value={kodeProduk}
          onChange={(e) => setKodeProduk(e.target.value)}
          error={errors.kodeProduk}
        />
        <InputField
          label="Nama Supplier"
          type="text"
          placeholder="Masukkan nama supplier..."
          value={namaSupplier}
          onChange={(e) => setNamaSupplier(e.target.value)}
          error={errors.namaSupplier}
        />
        <InputField
          label="Kategori Produk"
          type="dropdown"
          options={[
            { value: "", label: "Pilih kategori..." },
            { value: "susu", label: "Susu Bayi" },
            { value: "pakaian", label: "Pakaian Bayi" },
            { value: "mainan", label: "Mainan Anak" },
          ]}
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          error={errors.kategori}
        />

        {isFormValid() ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleSubmit}
          >
            Simpan
          </button>
        ) : (
          <div className="text-red-600 mt-2">
            Harap isi Formulir secara Lengkap & Valid !
          </div>
        )}

        {/* Menampilkan error jika ada
      {Object.keys(errors).length > 0 && (
        <div className="text-red-500 mt-2">
          Harap perbaiki data yang belum valid!
        </div>
      )} */}

        <div className="mt-4">
          <h2 className="text-lg font-bold">Total Stok: {total}</h2>
        </div>
      </Card>
    </div>
  );
}
