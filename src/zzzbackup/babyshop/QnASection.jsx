export default function QnASection() {
  return (
    <div>
      <h1 className="card">QnA For Moms & Baby</h1>
      <QnA1 />
      <QnA2 />
      <QnA3 />
      <QnA4 />
    </div>
  );
}

function QnA1() {
  return (
    <div className="card3">
      <p>
        <strong>Dapatkah bayi baru lahir mengenali suara ibunya ? </strong>
      </p>
      <ul>
        <p>
          Penelitian menunjukkan bahwa bayi dapat mengenali suara (suara orang
          tua, misalnya) dan bereaksi pada bulan pertama kelahirannya, namun tak
          dapat dipastikan dapat memahami emosi dan makna dari intonasi yang
          menyertai suara tersebut.
        </p>
      </ul>
    </div>
  );
}

function QnA2() {
  return (
    <div className="card3">
      <p>
        <strong>Berapa lama bayi perlu tidur dalam sehari?</strong>
      </p>
      <ul>
        <p>
          Bayi yang baru lahir membutuhkan sekitar 14-17 jam tidur per hari,
          sementara bayi usia 4-12 bulan membutuhkan 12-16 jam tidur, termasuk
          tidur siang.
        </p>
      </ul>
    </div>
  );
}

function QnA3() {
  return (
    <div className="card3">
      <p>
        <strong>Di mana saja Toko Bayi di Pekanbaru ?</strong>
      </p>
      <ul>
        <li>
          <strong>Kabakids Store:</strong> Jl. HR. Soebrantas No.23, Simpang
          Baru, Kec. Tampan, Kota Pekanbaru.
        </li>
        <li>
          <strong>Sayang Bunda Babyshop: </strong> Jl Letjend. S Parman No 6
          Gobah Pekanbaru Jl Beringin No 6 Gobah, Suka Maju, Kec. Sail, Kota
          Pekanbaru.
        </li>
        <li>
          <strong>Istana Bayi:</strong> Jl. Arifin Achmad NO 88 ABC, Tengkerang
          Tengah, Kec. Marpoyan Damai, Kota Pekanbaru.
        </li>
        <li>
          <strong>Nasywa Baby Shop:</strong> Jl. Durian No.76, Labuh Baru Tim.,
          Kec. Payung Sekaki, Kota Pekanbaru.
        </li>
      </ul>
    </div>
  );
}

function QnA4() {
  return (
    <div className="card3">
      <p>
        <strong>Posisi tidur seperti apakah yang baik untuk bayi baru ?</strong>
      </p>
      <ul>
        <p>
          Penelitian terakhir mengindikasikan bahwa bayi yang baru lahir
          sebaiknya dibaringkan dengan posisi terlentang. Posisi ini berperan
          mencegah terjadinya risiko kejadian SIDS (Sudden Infant Death
          Syindrome)
        </p>
      </ul>
    </div>
  );
}
