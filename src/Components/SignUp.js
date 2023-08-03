import React from 'react'
import './SignUp.css'
import {Formik} from 'formik'
import * as yup from 'yup'

const SignUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  dob: yup
    .date()
    .required("Date of birth is required"),
});

function SignUp() {
  return (
    <div className='Signup_main'>
      <h3>Sign Up</h3>
      <Formik
        initialValues={{
          name: "",
          password: "",
          email: "",
          cPassword: "",
          dob: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {}}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                  touched.name && !!errors.name && "border border-red-700"
                }`}
                placeholder="Enter your name"
              />
              {touched.name && !!errors.name && (
                <span className="text-xs text-red-700">{errors.name}</span>
              )}
            </div>
            <div className="mt-2">
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                  touched.email && !!errors.email && "border border-red-700"
                }`}
                placeholder="email"
              />
              {touched.email && !!errors.email && (
                <span className="text-xs text-red-700">{errors.email}</span>
              )}
            </div>
            <div className="mt-2">
              <input
                type="text"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="password"
                className={`block flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                  touched.password &&
                  !!errors.password &&
                  "border border-red-700"
                }`}
                placeholder="password"
              />
              {touched.password && !!errors.password && (
                <span className="text-xs text-red-700">{errors.password}</span>
              )}
            </div>
            <button type="submit">Sign Up</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default SignUp