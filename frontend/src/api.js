// write a simple API that returns a JSON object

function baseCall(method) {
  const baseUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:3000"
      : "https://holiday-api-app.onrender.com";

  return async function call(url, data, config = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...config.headers,
    };

    const options = {
      method,
      headers,
      credentials: "include",
    };

    if (method !== "GET") {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(new URL(url, baseUrl), options);

    if (response.status === 401) {
      window.location.href = "/login";
    }

    return response.json();
  };
}

export const api = {
  get: baseCall("GET"),
  post: baseCall("POST"),
  put: baseCall("PUT"),
  delete: baseCall("DELETE"),
};
