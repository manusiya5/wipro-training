const pool = require("../db/connection"); // Import the database connection pool

exports.getAllUsers = async (req,res,next) => {
    try{

       const [rows] = await pool.query("SELECT * FROM users");
        res.status(200).json({rows});
    }
catch(error){
    next(error);
}
};


exports.createUsers = async (req, res, next) => {
    try {
        const { name, email, department } = req.body;

        if (!name || !email || !department) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email " });
        }

        await pool.query(
            "INSERT INTO users (name, email, department) VALUES (?, ?, ?)",
            [name, email, department]
        );

        res.status(201).json({ message: "Registered successfully" });

    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Email already exists" });
        }

        next(error);
    }
};
