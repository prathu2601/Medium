import React, { useState } from 'react'
import './CreateBlog.css'
import {Formik} from 'formik'
import * as yup from 'yup'
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUpSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  topic: yup.string().required("Topic is required"),
  body: yup.string().required("Body is required"),
});


function EditBlog() {
    
    const navigate = useNavigate()
    const post = useLocation().state

    const editblog = (values)=>{
        fetch('http://localhost:3001/blog_posts/edit', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                id:post.id,
                title:values.title,
                topic:values.topic,
                body:values.body,
                imgurl:values.imgurl,
                views:post.views,
                user_id:post.user_id
            })
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data[0]);
            navigate(`/post/${data.id}`, {state:data})
        })
        .catch((err) => {
            console.log(err.message);
        });
    }
    

  return (
    <div className='Blog_main'>
        <Navbar/>
        <div className='Blog_sec'>
            <h2>Edit blog</h2>
            <Formik
                initialValues={{
                title: `${post.title}`,
                topic: `${post.topic}`,
                imgurl: `${post.imgurl}`,
                body: `${post.body}`,
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values) => editblog(values)}
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
                    <div className="input_div">
                        <input
                            type="text"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter title"
                        />
                        {touched.title && !!errors.title && (
                            <span>{errors.title}</span>
                        )}
                    </div>
                    <div className="input_div">
                        <input
                            type="text"
                            name="topic"
                            value={values.topic}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter topic"
                        />
                        {touched.topic && !!errors.topic && (
                            <span>{errors.topic}</span>
                        )}
                    </div>
                    <div className="input_div">
                        <input
                            type="text"
                            name="imgurl"
                            value={values.imgurl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter img url"
                        />
                    </div>
                    <div className="input_div">
                        <input
                            type="text"
                            name="body"
                            value={values.body}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter blog body"
                        />
                        {touched.body && !!errors.body && (
                            <span>{errors.body}</span>
                        )}
                    </div>
                    <button type="submit">Edit blog</button>
                </form>
                )}
            </Formik>
        </div>
    </div>
  );
}

export default EditBlog