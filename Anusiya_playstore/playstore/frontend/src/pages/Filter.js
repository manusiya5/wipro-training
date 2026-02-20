import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton"; 

export default function Filter() {
  const params   = useParams();
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    let url = "";
    if (params.rating) url = "http://localhost:5000/api/apps/filter?rating=" + params.rating;
    if (params.sort)   url = "http://localhost:5000/api/apps/filter?sort="   + params.sort;
    if (!url) return;
    fetch(url).then(r => r.json()).then(data => setApps(data));
  }, [params]);

  return (
    <div className="container mt-4">
      <BackButton />
      <h4 className="mb-3">
        {params.rating ? `Apps rated ${params.rating}⭐ & above` : `Sorted ${params.sort === "asc" ? "A → Z" : "Z → A"}`}
      </h4>
      {apps.length === 0 && <p className="text-muted">No apps found.</p>}
      {apps.map(app => (
        <div key={app._id} className="card p-2 mb-2" style={{ cursor:"pointer" }}
          onClick={() => navigate("/app/" + app._id)}>
          <strong>{app.name}</strong>
          <span className="text-muted ms-2" style={{ fontSize:".85rem" }}>{app.genre} · ⭐ {app.rating}</span>
        </div>
      ))}
    </div>
  );
}
