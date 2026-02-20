export default function Footer() {
  return (
    <footer style={{
      background: "#1a1a2e",
      color: "white",
      textAlign: "center",
      padding: "30px 20px",
      marginTop: "60px",
    }}>
      <div className="container">
        <h5 style={{ color: "#ffc107", marginBottom: "10px" }}> PlayStore</h5>
        <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "8px" }}>
           download your favourite apps
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "12px" }}>
          <span style={{ color: "#aaa", fontSize: "0.85rem" }}>🎮 Games</span>
          <span style={{ color: "#aaa", fontSize: "0.85rem" }}>💄 Beauty</span>
          <span style={{ color: "#aaa", fontSize: "0.85rem" }}>📚 Education</span>
          <span style={{ color: "#aaa", fontSize: "0.85rem" }}>🛍️ Shopping</span>
          <span style={{ color: "#aaa", fontSize: "0.85rem" }}>🎬 Entertainment</span>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p style={{ color: "#666", fontSize: "0.8rem", margin: 0 }}>
          © {new Date().getFullYear()} PlayStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}