export default function ListProduct() {
  return (
    <div>
      <div className="card">
        <Header />
      </div>
      <div className="card-container">
        <div className="cardp">
          <Product1 />
          <Price />
          <Desc />
        </div>
        <div className="cardp">
          <Product2 />
          <Price />
          <Desc />
        </div>
        <div className="cardp">
          <Product3 />
          <Price />
          <Desc />
        </div>
        <div className="cardp">
          <Product4 />
          <Price />
          <Desc />
        </div>
      </div>
    </div>
  );
}

function Product1() {
  return (
    <div>
      <img src="/img/imagearticle.jpg" alt="" />
      <p>
        <b>Nama Produk</b>
      </p>
    </div>
  );
}
function Product2() {
  return (
    <div>
      <img src="/img/p1.jpg" alt="" />
      <p>
        <b>Nama Produk</b>
      </p>
    </div>
  );
}
function Product3() {
  return (
    <div>
      <img src="/img/p2.jpg" alt="" />
      <p>
        <b>Nama Produk</b>
      </p>
    </div>
  );
}
function Product4() {
  return (
    <div>
      <img src="/img/p3.jpg" alt="" />
      <p>
        <b>Nama Produk</b>
      </p>
    </div>
  );
}
function Price() {
  return (
    <div>
      <p>Harga : 100.000</p>
    </div>
  );
}

function Desc() {
  return <p>Lorem ipsum dipum</p>;
}
function Header() {
  return <h1>Produk Bayi</h1>;
}
function Footer() {
  return <div></div>;
}
