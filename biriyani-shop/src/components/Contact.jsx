import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Contact = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Minimum 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Contact Data:", values);

    alert("Message sent successfully ✅");

    resetForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Contact Us
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-700">Name</label>
                <Field
                  name="name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Message</label>
                <Field
                  as="textarea"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
                  placeholder="Write your message"
                />
                <ErrorMessage
                  name="message"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-black transition"
              >
                Send Message
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
