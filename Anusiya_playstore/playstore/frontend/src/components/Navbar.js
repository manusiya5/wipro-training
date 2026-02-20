import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const navigate = useNavigate();
  const [search,      setSearch]      = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [theme,       setTheme]       = useState("light");

  const token    = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role     = localStorage.getItem("role");

  useEffect(() => { document.body.className = theme; }, [theme]);

  useEffect(() => {
    if (!search) { setSuggestions([]); return; }
    fetch("http://localhost:5000/api/apps/search?keyword=" + search)
      .then(r => r.json())
      .then(data => setSuggestions(data));
  }, [search]);

  const handleEnter = (e) => {
    if (e.key === "Enter") { navigate("/search/" + search); setSuggestions([]); }
  };

  const handleLogout = () => { localStorage.clear(); navigate("/login"); };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-lg sticky-top">
      <span className="navbar-brand fw-bold fs-4 text-warning" style={{ cursor:"pointer" }}
        onClick={() => navigate("/")}>
       playstore
      </span>

      <div className="position-relative w-50 mx-3">
        <input className="form-control rounded-pill" placeholder="🔍 Search apps..."
          value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleEnter} />

        {suggestions.length > 0 && (
          <div style={{ position:"absolute", background:"white", width:"100%", zIndex:1000, borderRadius:"10px", marginTop:"8px", boxShadow:"0 4px 12px rgba(0,0,0,0.1)" }}>
            {suggestions.map(app => (
              <div key={app._id}
                style={{ padding:"10px", cursor:"pointer", display:"flex", gap:"12px", alignItems:"center" }}
                onClick={() => { navigate("/app/" + app._id); setSuggestions([]); }}>
                <span style={{ fontSize:"1.8rem" }}>
                  {app.image
                    ? <img src={app.image} alt={app.name} style={{ width:"40px", height:"40px", borderRadius:"8px", objectFit:"cover" }} />
                    : ""}
                </span>
                <div>
                  <div style={{ fontWeight:600 }}>{app.name}</div>
                  <div style={{ fontSize:"0.85rem", color:"#666" }}>{app.genre} • ⭐ {app.rating}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dropdown">
        <button className="btn btn-outline-light dropdown-toggle rounded-pill" data-bs-toggle="dropdown">Filter</button>
        <ul className="dropdown-menu dropdown-menu-dark">
          <li><button className="dropdown-item" onClick={() => navigate("/filter/rating/4")}>4⭐ & above</button></li>
          <li><button className="dropdown-item" onClick={() => navigate("/filter/rating/3")}>3⭐ & above</button></li>
          <li><hr className="dropdown-divider" /></li>
          <li><button className="dropdown-item" onClick={() => navigate("/filter/sort/asc")}>A → Z</button></li>
          <li><button className="dropdown-item" onClick={() => navigate("/filter/sort/desc")}>Z → A</button></li>
        </ul>
      </div>

      <button className="btn btn-outline-warning ms-3 rounded-circle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <NotificationBell />

      <div className="ms-3 d-flex align-items-center gap-2">
        {token ? (
          <>
            <span className="text-white" style={{ fontSize:".85rem" }}>👤 {username}</span>
            {role === "admin" && (
              <button className="btn btn-sm btn-outline-light rounded-pill"
                onClick={() => navigate("/admin")}>Dashboard</button>
            )}
            <button className="btn btn-sm btn-outline-danger rounded-pill" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user"
            style={{ width:"40px", height:"40px", cursor:"pointer", borderRadius:"50%", border:"2px solid white" }}
            onClick={() => navigate("/login")} />
        )}
      </div>
    </nav>
  );
}
