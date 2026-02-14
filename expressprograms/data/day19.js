// const express = require("express");
// const app = express();
// app.get("/", (req, res) => {
//     res.send("Welcome to Express Server");
// });
// app.listen(4000, () => {
//     console.log("Server running on port 4000");
// });

// app.use((req, res, next) => {
//     console.log(`[${req.method}] ${req.url}`);
//     next();
// });

const express = require("express");
const app = express();

app.use(express.json());

let books = [
    { id: 1, title: "1984", author: "Orwell" },
    { id: 2, title: "The Alchemist", author: "Coelho" }
];

app.get("/books", (req, res) => {
    res.json(books);
});

app.post("/books", (req, res) => {
    books.push(req.body);
    res.send("Book added");
});

app.put("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    books = books.map(book =>
        book.id === id ? req.body : book
    );
    res.send("Book updated");
});

app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter(book => book.id !== id);
    res.send("Book deleted");
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
