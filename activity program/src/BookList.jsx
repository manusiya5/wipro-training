import { useState } from "react";
import BookCard from "./BookCard";

function BookList() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  const books = [
    { id: 1, title: "React Explained", author: "Zac Gordon", price: 499 },
    { id: 2, title: "JavaScript Guide", author: "MDN", price: 399 },
    { id: 3, title: "Clean Code", author: "Robert C. Martin", price: 599 },
    { id: 4, title: "JavaScript Guide", author: "MDN", price: 699 },

  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>📚 Featured Books</h2>

      {/* Controlled Component */}
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      {/* Toggle View */}
      <button onClick={() => setView("grid")}>Grid View</button>
      <button onClick={() => setView("list")}>List View</button>

      <div className={view}>
        {filteredBooks.map(book => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            price={book.price}
            view={view}
          />
        ))}
      </div>
    </div>
  );
}

export default BookList;