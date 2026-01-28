 function BookCard({ title, author, price, view }) {
  return (
    <div className={view === "grid" ? "grid-card" : "list-card"}>
      <h3>{title}</h3>
      <p>Author: {author}</p>
      <p>Price: ₹{price}</p>
    </div>
  );
}

export default BookCard;