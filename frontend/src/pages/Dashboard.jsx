import { useContext, useEffect, useState } from "react";
import { api } from "../api";
import { UserContext } from "../App";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
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

  return user ? (
    <div className="container p-10 flex flex-col gap-10 h-[600px] border border-gray-100 m-auto mt-10">
      <h1>Account</h1>
      {user.apiKey ? (
        <div className="flex flex-col gap-10">
          <h2 className="text-2xl font-bold">API key</h2>
          <div className="mt-4">
            <span className="bg-gray-50 text-gray-800 font-bold py-2 px-4 rounded mr-2">
              {user.apiKey}
            </span>
            <span
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer
            "
            >
              Copy
            </span>
          </div>
          <h1 className="text-xl">
            Requests Left:{" "}
            <span className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded ml-2">
              {user.requestsLeft}
            </span>
          </h1>
        </div>
      ) : (
        <button onClick={generateApiKey}>Generate API key!</button>
      )}
    </div>
  ) : null;
}

export default Dashboard;
