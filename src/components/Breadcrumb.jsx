export default function Breadcrumb({ items = [] }) {
    return (
      <nav className="text-sm text-gray-600 font-medium mb-4">
        {items.map((item, index) => (
          <span key={index}>
            {index !== 0 && <span className="mx-2">/</span>}
            <span className={index === items.length - 1 ? "text-black" : ""}>
              {item}
            </span>
          </span>
        ))}
      </nav>
    );
  }
  