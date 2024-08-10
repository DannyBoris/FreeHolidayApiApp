import { useEffect, useState } from "react";
import { api } from "../api";

function Countries() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    api.get("/api/v1/countries").then(setCountries);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Supported countries</h1>

      <ul className="flex flex-wrap gap-5">
        {countries.map((country) => (
          <li
            style={{ flex: "1 1 calc(20% - 20px)" }}
            className="flex items-center border border-gray-300 flex-auto w-fit p-2 rounded-md gap-5 text-sm"
            key={country.iso2}
          >
            <img
              onError={(e) =>
                (e.target.src = "https://placehold.co/600x400?text=N\\A")
              }
              width={40}
              src={country.flag}
              alt={country.iso2}
            />
            <span>{country.country}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Countries;
