import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BackButton from "../components/BackButton"; 

export default function CategoryApps() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [apps,    setApps]    = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/apps/category/" + name)
      .then(r => r.json())
      .then(data => { setApps(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [name]);

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-4">
      <BackButton />
      <h3 className="mb-2 fw-bold">{name}</h3>
      <div className="row">
        {apps.length === 0 ? <h5>No Apps Found</h5> : apps.map(app => (
          <div key={app._id} className="col-md-2 col-6 mb-2"
            onClick={() => navigate("/app/" + app._id)} style={{ cursor:"pointer" }}>
            <img src={app.image} className="img-fluid" alt={app.name}
              style={{ width:"120px", height:"120px", borderRadius:"20px", objectFit:"cover" }}
              onError={e => (e.target.src = "https://via.placeholder.com/120")} />
            <h6 className="mt-2">{app.name}</h6>
            <p className="text-muted">{app.rating} ⭐</p>
          </div>
        ))}
      </div>
    </div>
  );
}
