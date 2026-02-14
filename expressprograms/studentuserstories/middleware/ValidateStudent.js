function validateStudent(req, res, next) {

    const { name, email } = req.body;

    // check if fields exist
    if (!name || !email) {
        return res.status(400).json({
            message: "Name and Email are required"
        });
    }
    next();
}

module.exports = validateStudent;