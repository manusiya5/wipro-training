import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === values.email &&
      storedUser.password === values.password
    ) {
      // ✅ AUTH SUCCESS
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "user");

      navigate("/home", { replace: true }); // ✅ IMPORTANT
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form className="space-y-4">
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

            {/* ✅ REAL LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg"
            >
              Login
            </button>
          </Form>
        </Formik>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?
          <Link to="/signup" className="text-black ml-1 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
