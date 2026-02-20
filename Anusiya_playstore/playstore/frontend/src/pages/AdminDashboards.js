import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton"; 

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [apps,       setApps]       = useState([]);
  const [editingApp, setEditingApp] = useState(null);
  const [form,       setForm]       = useState({});
  const token = localStorage.getItem("token");

  const loadApps = () => {
    fetch("http://localhost:5000/api/apps")
      .then(r => r.json())
      .then(data => setApps(data));
  };

  useEffect(() => { loadApps(); }, []);

  const deleteApp = async (id) => {
    if (!window.confirm("Delete this app?")) return;
    const res  = await fetch("http://localhost:5000/api/apps/" + id, {
      method:"DELETE", headers:{ "Authorization":"Bearer " + token },
    });
    const data = await res.json();
    alert(data); loadApps();
  };

  const openEdit = (app) => {
    setEditingApp(app._id);
    setForm({ name:app.name||"", genre:app.genre||"", version:app.version||"",
              developer:app.developer||"", description:app.description||"", image:app.image||"" });
  };

  const saveEdit = async () => {
    if (!form.name || !form.genre || !form.version) { alert("Name, Genre and Version required"); return; }
    await fetch("http://localhost:5000/api/apps/" + editingApp, {
      method:"PUT",
      headers:{ "Content-Type":"application/json", "Authorization":"Bearer " + token },
      body: JSON.stringify(form),
    });
    alert("App updated!"); setEditingApp(null); loadApps();
  };

  return (
    <div className="container mt-4">
      <BackButton />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Admin Dashboard</h3>
        <button className="btn btn-success" onClick={() => navigate("/add-app")}>+ Add App</button>
      </div>

      {apps.length === 0 && <p>No apps yet.</p>}

      {apps.map(app => (
        <div key={app._id} className="card p-3 mt-2">
          {editingApp === app._id ? (
            <div>
              <h5>Edit: {app.name}</h5>
              {["name","genre","version","developer","description","image"].map(field => (
                <input key={field} className="form-control mb-2"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })} />
              ))}
              <button className="btn btn-primary btn-sm me-2" onClick={saveEdit}> Save</button>
              <button className="btn btn-secondary btn-sm" onClick={() => setEditingApp(null)}>Cancel</button>
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{app.name}</strong>
                <span className="text-muted ms-2" style={{ fontSize:".85rem" }}>
                  {app.genre} · v{app.version} · ⭐ {app.rating}
                </span>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-warning btn-sm" onClick={() => openEdit(app)}> Edit</button>
                <button className="btn btn-danger btn-sm"  onClick={() => deleteApp(app._id)}> Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
