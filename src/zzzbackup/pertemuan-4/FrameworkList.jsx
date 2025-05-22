import frameworkData from "./framework.json";

export default function FrameworkList() {
  return (
    <div className="p-8">
      {frameworkData.map((item) => (
        <div
          key={item.id}
          className="border p-4 mb-4 rounded-lg shadow-md bg-white"
        >
          <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
          <p className="text-gray-600">{item.description}</p>
          <h3>{item.details.developer}</h3>
          <a
            href={item.details.officialWebsite}
            target="_blank"
            className="text-blue-500 text-sm underline"
          >
            {item.details.officialWebsite}
          </a>
          <br/>
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-red-200 text-gray-700 px-2 py-1 text-xs rounded-full mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
