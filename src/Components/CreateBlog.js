import React, { useState } from 'react'
import './CreateBlog.css'
import {Formik} from 'formik'
import * as yup from 'yup'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const SignUpSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  topic: yup.string().required("Topic is required"),
  body: yup.string().required("Body is required"),
});


function CreateBlog() {
    
    const navigate = useNavigate()

    const [user, setUser] = useState(localStorage.getItem('user_info')?JSON.parse(localStorage.getItem('user_info')):{})
    
    const createblog = (values)=>{
        if(user.id === undefined){
            alert("Sign in First")
            navigate('/signin')
        }
        else{
            fetch('http://localhost:3001/blog_posts/create', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    title:values.title,
                    topic:values.topic,
                    body:values.body,
                    imgurl:values.imgurl,
                    views:0,
                    user_id:user.id
                })
            })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data.result);
                navigate(`/post/${data.result.id}`)
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
    }
    

  return (
    <div className='Blog_main'>
        <Navbar/>
        <div className='Blog_sec'>
            <h2>Create blog</h2>
            <Formik
                initialValues={{
                title: "",
                topic: "",
                imgurl: "",
                body: "",
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values) => createblog(values)}
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
                    <button type="submit">Create blog</button>
                </form>
                )}
            </Formik>
        </div>
    </div>
  );
}

export default CreateBlog