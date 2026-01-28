import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/adminlogin";

  return (
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>
      {!hideLayout && <Header toggleTheme={toggleTheme} theme={theme} />}
      <AnimatedRoutes />
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
