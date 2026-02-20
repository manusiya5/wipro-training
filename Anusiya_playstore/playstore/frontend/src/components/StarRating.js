import { useState } from "react";

export default function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0);
  return (
    <div>
      {[1,2,3,4,5].map(star => (
        <span key={star}
          style={{ fontSize:"40px", cursor:"pointer", color: star <= (hover || rating) ? "orange" : "grey" }}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >★</span>
      ))}
    </div>
  );
}
