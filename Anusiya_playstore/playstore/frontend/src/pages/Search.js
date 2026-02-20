import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton"; 

export default function Search() {
  const { keyword } = useParams();
  const navigate    = useNavigate();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/apps/search?keyword=" + keyword)
      .then(r => r.json())
      .then(data => setApps(data));
  }, [keyword]);

  return (
    <div className="container mt-4">
      <BackButton />
      <h3>Search Result for "{keyword}"</h3>
      {apps.length === 0 && <p className="text-muted">No apps found.</p>}
      {apps.map(app => (
        <div key={app._id} className="card p-2 mb-2" style={{ cursor:"pointer" }}
          onClick={() => navigate("/app/" + app._id)}>
          <strong>{app.name}</strong>
          <span className="text-muted ms-2" style={{ fontSize:".85rem" }}>
            {app.genre} · ⭐ {app.rating}
          </span>
        </div>
      ))}
    </div>
  );
}
