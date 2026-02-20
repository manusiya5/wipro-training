import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import StarRating from "../components/StarRating";  
import BackButton from "../components/BackButton"; 

export default function AppDetails() {
  const { id } = useParams();
  const [app,    setApp]    = useState(null);
  const [rating, setRating] = useState(0);           // ✅ changed "" to 0
  const [review, setReview] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating,      setEditRating]      = useState(0);  // ✅ changed "" to 0
  const [editReview,      setEditReview]      = useState("");

  const token  = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const loadApp = () => {
    fetch("http://localhost:5000/api/apps/" + id)
      .then(r => r.json())
      .then(data => setApp(data));
  };

  useEffect(() => { loadApp(); }, [id]);

  const installApp = async () => {
  if (!token) { alert("Please login to install apps"); return; }
  try {
    const res = await fetch(`http://localhost:5000/api/apps/${id}/install`, {
      method: "POST",
      headers: { "Authorization": "Bearer " + token },
    });
    const data = await res.json();
    alert(data.message || "App installed!");
  } catch (err) {
    alert("Install failed");
  }
};

  const submitReview = async () => {
    if (!token) { alert("Login First"); return; }
    if (!rating || rating < 1) { alert("Please select a star rating"); return; }  // ✅ updated
    const res  = await fetch("http://localhost:5000/api/reviews/" + id, {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Authorization":"Bearer " + token },
      body: JSON.stringify({ rating: Number(rating), review }),
    });
    const data = await res.json();
    alert(data);
    loadApp(); setRating(0); setReview("");   // ✅ reset to 0
  };

  const openEdit = (r) => {
    setEditingReviewId(r._id);
    setEditRating(r.rating);
    setEditReview(r.review);
  };

  const saveEdit = async () => {
    if (!editRating || editRating < 1) { alert("Please select a star rating"); return; }  // ✅ updated
    const res = await fetch(`http://localhost:5000/api/reviews/${id}/${editingReviewId}`, {
      method:"PUT",
      headers:{ "Content-Type":"application/json", "Authorization":"Bearer " + token },
      body: JSON.stringify({ rating: Number(editRating), review: editReview }),
    });
    alert(await res.json());
    setEditingReviewId(null); loadApp();
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Delete your review?")) return;
    const res = await fetch(`http://localhost:5000/api/reviews/${id}/${reviewId}`, {
      method:"DELETE", headers:{ "Authorization":"Bearer " + token },
    });
    alert(await res.json()); loadApp();
  };

  if (!app) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5">
      <BackButton />
      <div className="row">
        <div className="col-md-8">
          <h1>{app.name}</h1>
          <p className="text-success fw-bold">{app.developer || "PlayStore Inc"}</p>
          <div className="d-flex gap-4 mt-3">
            <div><h4>{app.rating} ⭐</h4><p>Rating</p></div>
            <div><h4>{app.downloads || "1M+"}</h4><p>Downloads</p></div>
            <div><h4>{app.version}</h4><p>Version</p></div>
          </div>
          <button className="btn btn-success mt-4" onClick={installApp}>Install</button>
          <h4 className="mt-4">About this app</h4>
          <p>{app.description}</p>
        </div>
        <div className="col-md-4 text-center">
          <img src={app.image} alt={app.name}
            style={{ width:"250px", borderRadius:"30px" }}
            onError={e => (e.target.src = "https://via.placeholder.com/250")} />
        </div>
      </div>

      {/* REVIEWS LIST */}
      <div className="mt-5">
        <h3>Ratings & Reviews</h3>
        {!app.reviews || app.reviews.length === 0 ? <p>No Reviews Yet</p> : (
          app.reviews.map((r, index) => (
            <div key={r._id || index} className="card p-3 mt-3">
              {editingReviewId === r._id ? (
                <>
                  {/* ✅ StarRating in edit form too */}
                  <p className="mb-1 fw-semibold">Your Rating:</p>
                  <StarRating rating={editRating} setRating={setEditRating} />
                  <textarea className="form-control mb-2 mt-2" value={editReview}
                    onChange={e => setEditReview(e.target.value)} />
                  <button className="btn btn-primary btn-sm me-2" onClick={saveEdit}>Save</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditingReviewId(null)}>Cancel</button>
                </>
              ) : (
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5>{r.user?.name || "User"}</h5>
                    <p>{r.review}</p>
                    <p>{"⭐".repeat(r.rating)}</p>
                  </div>
                  {userId && r.user && String(r.user._id) === String(userId) && (
                    <div className="d-flex gap-2">
                      <button className="btn btn-warning btn-sm" onClick={() => openEdit(r)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteReview(r._id)}>Delete</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {/* ✅ ADD REVIEW with StarRating */}
        <div className="card p-3 mt-4">
          <h4>Add Review</h4>
          <p className="mb-1 fw-semibold">Your Rating:</p>
          <StarRating rating={rating} setRating={setRating} />
          <textarea className="form-control mb-2 mt-2" placeholder="Write your review..."
            value={review} onChange={e => setReview(e.target.value)} />
          <button className="btn btn-success" onClick={submitReview}>Submit</button>
        </div>
      </div>
    </div>
  );
}