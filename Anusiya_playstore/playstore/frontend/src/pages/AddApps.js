import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton"; 


export default function AddApps() {
  const navigate = useNavigate();
  const token    = localStorage.getItem("token");
  const [name, setName]    = useState("");
  const [genre, setGenre]   = useState("");
  const [version, setVersion]    = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage]    = useState("");

  const add = async () => {
    if (!name || !genre || !version) { alert("Name, Genre and Version are required"); return; }
    const res = await fetch("http://localhost:5000/api/apps", {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Authorization":"Bearer " + token },
      body: JSON.stringify({ name, genre, version, description, image }),
    });
    if (res.ok) { alert("App added successfully!"); navigate("/admin"); }
    else { const d = await res.json(); alert("Failed: " + JSON.stringify(d)); }
  };

  return (
    <div className="container mt-4" style={{ maxWidth:"500px" }}>
      <BackButton />
      <h4 className="mb-3">Add New App</h4>
      <input className="form-control mb-2" placeholder="Name"    onChange={e => setName(e.target.value)} />
      <input className="form-control mb-2" placeholder="Genre (e.g. Games)"   onChange={e => setGenre(e.target.value)} />
      <input className="form-control mb-2" placeholder="Version (e.g. 1.0.0)"  onChange={e => setVersion(e.target.value)} />
      <input className="form-control mb-2" placeholder="Developer Name"  onChange={e => {}} />
      <input className="form-control mb-2" placeholder="Description"  onChange={e => setDescription(e.target.value)} />
      <input className="form-control mb-3" placeholder="Image URL"  onChange={e => setImage(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={add}>Add App</button>
    </div>
  );
}
