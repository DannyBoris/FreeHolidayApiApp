import { useEffect, useState } from "react";
import { api } from "../api";

function Dashboard() {
  const [user, setUser] = useState({});
  const [holidayJson, setHolidayJson] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await api.get("/api/v1/auth/me");
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  async function generateApiKey() {
    const { apiKey } = await api.post("/api/v1/api_key/generate_api_key");
    setUser((prevUser) => ({ ...prevUser, apiKey }));
  }

  return (
    <div className="container p-10 flex flex-col gap-10">
      {user.apiKey ? (
        <div>
          <p>
            API Key:
            <span className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded ml-2">
              {user.apiKey}
            </span>
          </p>
        </div>
      ) : (
        <button
          onClick={generateApiKey}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Generate API Key
        </button>
      )}
      <p>Requests Left: {user.requestsLeft}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={async () => {
          console.log("Try it now");
          const response = await api.get(
            `/api/v1/holidays?country=US&year=2021&apiKey=${user.apiKey}`
          );
          setHolidayJson(response.slice(0, 5));
        }}
      >
        Try it now
      </button>
      <pre className="text-sm w-fit overflow-auto bg-gray-200">
        {JSON.stringify(holidayJson, null, 2)}
      </pre>
    </div>
  );
}

export default Dashboard;
