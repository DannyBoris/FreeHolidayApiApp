function ApiDocs() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">API Documentation</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">/api/v1/countries</h2>
        <p className="mb-2">Returns a list of all countries.</p>
        <pre className="p-2 bg-gray-800 text-white rounded">
          <code>GET /api/v1/countries</code>
        </pre>
      </div>
      <h2 className="text-2xl font-semibold mb-2">Response Structure</h2>
      <p className="mb-2">
        Here is an example of a country object in the response:
      </p>
      <pre className="p-2 bg-gray-800 text-white rounded mb-2">
        <code>
          {`{
    "continent": "Asia",
    "region": "South Asia",
    "country": "Afghanistan",
    "capital": "Kabul",
    "fips": "AF",
    "iso2": "AF",
    "iso3": "AFG",
    "isoNo": "004",
    "internet": "AF",
    "flag": "https://flagsapi.com/AF/flat/64.png"
}`}
        </code>
      </pre>
      <hr className="my-3 text-gray-100" />

      <div>
        <h2 className="text-2xl font-semibold mb-2">/api/v1/holidays</h2>
        <p className="mb-2">
          Returns holidays for a specific country and year. Requires an API key.
        </p>
        <pre className="p-2 bg-gray-800 text-white rounded mb-2">
          <code>
            GET /api/v1/holidays?country=
            <span className="text-blue-400">[iso2]</span>&year=
            <span className="text-blue-400">[year]</span>&apiKey=
            <span className="text-blue-400">[userApiKey]</span>
          </code>
        </pre>
        <ul className="list-disc pl-5">
          <li className="mb-1">
            <strong className="font-semibold">country</strong> - The ISO2 code
            of the country.
          </li>
          <li className="mb-1">
            <strong className="font-semibold">year</strong> - The year for which
            to return holidays.
          </li>
          <li>
            <strong className="font-semibold">apiKey</strong> - Your API key.
          </li>
          <hr className="my-3 text-gray-50" />
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Response Structure for /api/v1/holidays
        </h2>
        <p className="mb-2">
          Here is an example of a holiday object in the response:
        </p>
        <pre className="p-2 bg-gray-800 text-white rounded mb-2">
          <code>
            {`{
    "name": "New Year's Day",
    "date": { "month": 1, "day": 1 },
    "formattedDate": "1 Jan",
    "weekday": { "numeric": 5, "name": "Friday" },
    "is_public": false,
    "is_observed": false,
    "is_religious": false,
    "type": "national holiday"
}`}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default ApiDocs;
