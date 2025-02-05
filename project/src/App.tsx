import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "./components/auth/LoginForm";
import { PortfolioForm } from "./components/portfolio/PortfolioForm";
import PortfolioRouter from "./components/portfolio/PortfolioRouter";
import { PortfolioProvider } from "./components/portfolio/PortfolioContext";

// Helper function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <PortfolioProvider> {/* Move it outside of <Routes> */}
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <PortfolioForm />
              </PrivateRoute>
            }
          />
          <Route path="/preview" element={<PortfolioRouter />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
