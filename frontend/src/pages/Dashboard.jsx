import { useContext, useEffect, useState } from "react";
import { api } from "../api";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const [holidayJson, setHolidayJson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/v1/auth/me")
      .then(setUser)
      .catch(() => {
        navigate("/login");
      });
  }, [setUser, navigate]);

  async function generateApiKey() {
    const { apiKey } = await api.post("/api/v1/api_key/generate_api_key");
    setUser((prevUser) => ({ ...prevUser, apiKey }));
  }

  return user ? (
    <div className="container p-10 flex flex-col gap-10 h-[600px] border border-gray-100 m-auto mt-10">
      <h1 className="text-4xl font-bold mb-6">Account</h1>
      {user.apiKey ? (
        <div className="flex">
          <div className="flex flex-col gap-10 flex-1">
            <h2 className="text-2xl font-bold">API key</h2>
            <div className="mt-4">
              <span className="bg-gray-50 text-gray-800 font-bold py-2 px-4 rounded mr-2">
                {user.apiKey}
              </span>
              <span
                onClick={() => {
                  navigator.clipboard.writeText(user.apiKey);
                  toast.success("API key copied to clipboard");
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
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
          <div className=" flex-1">
            <button
              className="btn-outline btn-lg w-full"
              onClick={() => {
                console.log("Try it now");
                api
                  .get(
                    `/api/v1/holidays?country=US&year=2021&apiKey=${user.apiKey}`
                  )
                  .then((response) => {
                    console.log(response);
                    setHolidayJson(response.slice(0, 3));
                  })
                  .catch(console.error);
              }}
            >
              Try it
            </button>
            {holidayJson && (
              <pre className="w-fit  bg-gray-800 text-white text-xs mt-10">
                {JSON.stringify(holidayJson, null, 2)}
              </pre>
            )}
          </div>
        </div>
      ) : (
        <button className="btn-primary btn-lg" onClick={generateApiKey}>
          Generate API key
        </button>
      )}
    </div>
  ) : null;
}

export default Dashboard;
