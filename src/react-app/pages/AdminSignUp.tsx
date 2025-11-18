import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router';
import { useState } from "react";

export default function AdminSignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Strong Password Regex
  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .matches(
        passwordRules,
        "Password must contain upper, lower, number & special char (8-10 chars)"
      )
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Admin Sign Up
      </h2>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            // const response = await fetch("/api/users/register", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify(values),
            // });
            const response=values;

            if (response) {
              navigate("/admin/login");
            } else {
              // const data = await response.json();
              // setError(data.error || "Registration failed");
            }
          } catch (err) {
            setError("Something went wrong");
          }
        }}
      >
        {() => (
          <Form className="space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <Field
                type="password"
                name="confirmPassword"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded mt-3"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
