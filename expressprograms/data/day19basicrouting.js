// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//     res.send("Welcome to SkillSphere LMS API");
// });

// app.listen(4000, () => {
//     console.log("Server running on port 4000");
// });

// const express = require("express");
// const app = express();

// app.get("/courses/:id", (req, res) => {
//     res.json({
//         id: req.params.id,
//         name: "React Mastery",
//         duration: "6 weeks"
//     });
// });

// app.listen(4000, () => {
//     console.log("Server running on port 4000");
// });



const express = require("express");
const app = express();

function validateCourseId(req, res, next) {
    if (isNaN(req.params.id)) {
        res.json({ error: "Invalid course ID" });
    } else {
        next();
    }
}

app.get("/courses/:id", validateCourseId, (req, res) => {
    res.json({
        id: req.params.id,
        name: "React Mastery",
        duration: "6 weeks"
    });
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
