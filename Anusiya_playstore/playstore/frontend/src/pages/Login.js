import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res  = await fetch("http://localhost:5000/api/auth/login", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token",    data.token);
        localStorage.setItem("role",     data.user.role);
        localStorage.setItem("username", data.user.name);
        localStorage.setItem("userId",   data.user.id); 
        if (data.user.role === "admin") navigate("/admin");
        else navigate("/");
      } else {
        alert("Login Failed: " + JSON.stringify(data));
      }
    } catch { alert("Server Error"); }
  };

  return (
    <div className="container mt-5" style={{ maxWidth:"400px" }}>
      <h3 className="mb-3">Login</h3>
      <input className="form-control mb-3" placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)} />
      <input className="form-control mb-3" type="password" placeholder="Password" value={password}
        onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={login}>Login</button>
      <p className="text-center mt-3" style={{ fontSize:".9rem" }}>
        No account?{" "}
        <span style={{ color:"#0d6efd", cursor:"pointer" }} onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
  );
}
