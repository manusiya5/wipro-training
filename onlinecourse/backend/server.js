const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let courses = [
    { id: 1, name: "Java" },
    { id: 2, name: "C" },
    { id: 3, name: "Node js" },
    { id: 4, name: "React js" }
];

app.get("/courses", (req, res) => {
    res.json(courses);
});

app.post("/courses", (req, res) => {
    const course = {
        id: Date.now(),         
        name: req.body.name
    };
    courses.push(course);
    res.json(course);
});


app.delete("/courses/:id", (req, res) => {
    const id = Number(req.params.id);
    courses = courses.filter(c => c.id !== id);
    res.json({ message: "Deleted" });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
