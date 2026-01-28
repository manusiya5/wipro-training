import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    localStorage.setItem("user", JSON.stringify(values));
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <Field
                name="name"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-black"
            >
              Sign Up
            </button>
          </Form>
        </Formik>

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <Link to="/login" className="text-black ml-1 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
