import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home   from "./pages/Home";
import Login   from "./pages/Login";
import Register   from "./pages/Register";
import CategoryApps  from "./pages/CategoryApps";
import AppDetails   from "./pages/AppDetails";
import Search  from "./pages/Search";
import Filter from "./pages/Filter";
import AddApps  from "./pages/AddApps";
import AdminDashboards from "./pages/AdminDashboards";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <Routes>
        <Route path="/"   element={<Home />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/category/:name" element={<CategoryApps />} />
        <Route path="/app/:id"  element={<AppDetails />} />
        <Route path="/admin"  element={<AdminDashboards />} />
        <Route path="/add-app"  element={<AddApps />} />
        <Route path="/search/:keyword"  element={<Search />} />
        <Route path="/filter/rating/:rating" element={<Filter />} />
        <Route path="/filter/sort/:sort"  element={<Filter />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
