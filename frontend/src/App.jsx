import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Countries from "./pages/Countries";
import NotFound404 from "./pages/NotFound404";
import { createContext, useEffect, useState } from "react";
import { api } from "./api";
import ApiDocs from "./pages/ApiDocs";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

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

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Layout>
          <ToastContainer theme="colored" hideProgressBar autoClose={1500} />
          <Routes>
            <Route path="/" Component={Landing} />
            <Route path="/login" Component={Login} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/countries" Component={Countries} />
            <Route path="/docs" Component={ApiDocs} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Layout>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
