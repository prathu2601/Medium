import React from 'react'
import './CreateBlog.css'
import {Formik} from 'formik'
import * as yup from 'yup'
import Navbar from './Navbar';

const SignUpSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  topic: yup.string().required("Topic is required"),
  img: yup.string().required("Image is required"),
  body: yup.string().required("Body is required"),
});

function CreateBlog() {
  return (
    <div>
        <Navbar/>
        <div className='Blog_main'>
        <h2>Create blog</h2>
        <Formik
            initialValues={{
            title: "",
            topic: "",
            img: "",
            body: "",
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
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // className={`block flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                    //   touched.name && !!errors.name && "border border-red-700"
                    // }`}
                    placeholder="Enter your name"
                />
                {touched.name && !!errors.name && (
                    <span className="text-xs text-red-700">{errors.name}</span>
                )}
                </div>
                <div className="mt-2">
                <input
                    type="text"
                    name="topic"
                    value={values.topic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // className={`block flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                    //   touched.email && !!errors.email && "border border-red-700"
                    // }`}
                    placeholder="topic"
                />
                {touched.email && !!errors.email && (
                    <span className="text-xs text-red-700">{errors.email}</span>
                )}
                </div>
                <div className="mt-2">
                <input
                    type="text"
                    name="img"
                    value={values.img}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // className={`block flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                    //   touched.password &&
                    //   !!errors.password &&
                    //   "border border-red-700"
                    // }`}
                    placeholder="img url"
                />
                {touched.password && !!errors.password && (
                    <span className="text-xs text-red-700">{errors.password}</span>
                )}
                </div>
                <div className="mt-2">
                <input
                    type="text"
                    name="body"
                    value={values.body}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // className={`block flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                    //   touched.password &&
                    //   !!errors.password &&
                    //   "border border-red-700"
                    // }`}
                    placeholder="blog body"
                />
                {touched.password && !!errors.password && (
                    <span className="text-xs text-red-700">{errors.password}</span>
                )}
                </div>
                <button type="submit">Create blog</button>
            </form>
            )}
        </Formik>
        </div>
    </div>
  );
}

export default CreateBlog