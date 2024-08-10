// write a simple API that returns a JSON object

function baseCall(method) {
  return async function call(url, body, config = {}) {
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
      options.body = JSON.stringify(body);
    }
    console.log({ apiUrl: "" });
    const response = await fetch(
      import.meta.env.MODE === "development"
        ? new URL(url, "http://localhost:3000")
        : url,
      options
    );

    if (response.status === 401) {
      window.location.href = "/login";
    }

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }

    return data;
  };
}

export const api = {
  get: baseCall("GET"),
  post: baseCall("POST"),
  put: baseCall("PUT"),
  delete: baseCall("DELETE"),
};
