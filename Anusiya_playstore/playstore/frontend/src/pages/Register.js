import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    if (!name || !email || !password) { alert("Please fill  all fields"); return; }
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) { alert("Registered! Please login."); navigate("/login"); }
      else alert("Failed: " + JSON.stringify(data));
    } catch { alert("Server Error"); }
  };

  return (
    <div className="container mt-5" style={{ maxWidth:"400px" }}>
      <h3 className="mb-3">Register</h3>
      <input className="form-control mb-2" placeholder="Name"     onChange={e => setName(e.target.value)} />
      <input className="form-control mb-2" placeholder="Email"    onChange={e => setEmail(e.target.value)} />
      <input className="form-control mb-3" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-success w-100" onClick={register}>Register</button>
      <p className="text-center mt-3" style={{ fontSize:".9rem" }}>
        Already have account?{" "}
        <span style={{ color:"#0d6efd", cursor:"pointer" }} onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
}
