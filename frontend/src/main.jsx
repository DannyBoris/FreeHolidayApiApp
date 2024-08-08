import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Layout from "./components/Layout/index.jsx";
import Landing from "./pages/Landing.jsx";
import Countries from "./pages/Countries.jsx";
import TermsAndService from "./pages/Terms&Services.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/login" Component={Login} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/countries" Component={Countries} />
          <Route path="/terms" Component={TermsAndService} />
        </Routes>
      </Layout>
    </Router>
  </StrictMode>
);
