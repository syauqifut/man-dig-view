import React, { useState } from "react";

interface SearchResult {
  key: string;
  data: any[]; // Replace 'any' with a more specific type if you know the structure
}

const SearchComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full mt-16">
        <h1 className="text-3xl font-bold text-center">
          Digital Entertainment
        </h1>
        <p className="text-center">
          Scrape of list digital products and display here
        </p>
      </div>
      <div className="w-full max-w-md mt-10">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Films / Books / Game / Anime"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      <div className="mt-10 w-full max-w-2xl">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          results.map((result) => (
            <div
              key={result.key}
              className="mb-4 bg-white p-4 rounded-md shadow"
            >
              <h2 className="text-xl font-bold mb-2 capitalize">
                {result.key}
              </h2>
              {result.data.length === 0 && (
                <p className="text-center">No data found</p>
              )}
              <div>
                {result.data.map((item, index) => (
                  <div
                    key={index}
                    className="mb-1 w-full flex items-center bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="w-1/4 h-24 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <div className="w-24 h-24 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="w-1/2 px-4 py-2">
                      <h4 className="font-bold text-lg">
                        {item.title} {item.year !== "" && `(${item.year})`}
                      </h4>
                      <p>
                        <span className="font-bold">Type:</span> {item.type}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.desc}
                      </p>
                    </div>
                    <div className="w-1/4 flex justify-center items-center">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                      >
                        Go To Page
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
