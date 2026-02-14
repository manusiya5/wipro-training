import { useEffect, useState } from "react";

function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        const res = await fetch("http://localhost:3001/courses");
        const data = await res.json();
        setCourses(data);
    };

    const deleteCourse = async (id) => {
        await fetch(`http://localhost:3001/courses/${id}`, {
            method: "DELETE"
        });
        loadCourses();
    };

    return (
        <div className="row">
            {courses.map(course => (
                <div className="col-md-4 mb-3" key={course.id}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                {course.name}
                            </h5>

                            <button
                                className="btn btn-danger"
                                onClick={() => deleteCourse(course.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CourseList;
