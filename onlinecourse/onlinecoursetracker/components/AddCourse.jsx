import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCourse() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const addCourse = async () => {
        await fetch("http://localhost:3001/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });
        navigate("/");
    };

    return (
        <div className="card p-4">
            <h4 className="mb-3">Add Course</h4>

            <input
                className=" mb-3"
                placeholder="Course Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button className="btn btn-success" onClick={addCourse}>
                Save
            </button>
        </div>
    );
}

export default AddCourse;
