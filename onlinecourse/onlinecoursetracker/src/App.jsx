import { Routes, Route, Link } from "react-router-dom";
import AddCourse from "../components/AddCourse";
import CourseList from "../components/CourseList";

function App() {
    return (
        <div className="container mt-3">

            <nav className="navbar navbar-light bg-light mb-4 px-3">
                <span className="navbar-brand">Online Course Tracker</span>

                <Link to="/add" className="btn btn-success">
                    Add Course
                </Link>
            </nav>

            <Routes>
                <Route path="/" element={<CourseList />} />
                <Route path="/add" element={<AddCourse />} />
            </Routes>

        </div>
    );
}

export default App;
