import { useNavigate } from "react-router-dom";
import "./CategorySection.css";

export default function CategorySection() {
  const navigate = useNavigate();

  const categories = [
    { name:"Games",  icon:"https://cdn-icons-png.flaticon.com/512/686/686589.png",   color:"#e8f0fe" },
    { name:"Beauty",  icon:"https://cdn-icons-png.flaticon.com/512/1022/1022331.png", color:"#fce4ec" },
    { name:"Education",   icon:"https://cdn-icons-png.flaticon.com/512/3135/3135755.png", color:"#e8f5e9" },
    { name:"Health", icon:"https://cdn-icons-png.flaticon.com/512/2966/2966480.png", color:"#fff3e0" },
    { name:"Entertainment", icon:"https://cdn-icons-png.flaticon.com/512/833/833314.png",   color:"#f3e5f5" },
    { name:"Shopping", icon:"https://cdn-icons-png.flaticon.com/512/263/263142.png",   color:"#e0f7fa" },
  ];

  return (
    <div className="container mt-5">
      <h4 className="mb-4 fw-bold">Categories</h4>
      <div className="row">
        {categories.map(cat => (
          <div key={cat.name} className="col-md-4 col-6 mb-4"
            onClick={() => navigate("/category/" + cat.name)}>
            <div className="play-card" style={{ background: cat.color }}>
              <div className="icon-circle">
                <img src={cat.icon} alt={cat.name} />
              </div>
              <p className="mt-3 fw-semibold">{cat.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
