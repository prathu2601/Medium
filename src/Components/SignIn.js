import React, { useEffect, useState } from 'react'
import './SignIn.css'
import {Formik} from 'formik'
import * as yup from 'yup'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const SignUpSchema = yup.object().shape({
  email: yup.string().email("Enter valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

function SignIn() {

  const navigate = useNavigate()
  const [user,setUSer] = useState(localStorage.getItem('user_info')?JSON.parse(localStorage.getItem('user_info')):{})


  useEffect(()=>{
    
    if(user.id !== undefined){
      alert("Already Signed In")
      navigate(`/author/${user.id}`)
    }

  },[])

  const signin = (values)=>{
    fetch(`http://localhost:3001/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email:values.email,
        password:values.password
      })
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status === 0) alert(data.notice)
      else{
        localStorage.setItem('user_info',JSON.stringify(data.result))
        navigate(`/author/${data.result.id}`)
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
  }


  return (
    <div className='Signin_main'>
    <Navbar/>
    <div className='Signin_sec'>
      <h2>Sign In</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => signin(values)}
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
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="email"
              />
              {touched.email && !!errors.email && (
                <span>{errors.email}</span>
              )}
            </div>
            <div className="input_div">
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="password"
              />
              {touched.password && !!errors.password && (
                <span>{errors.password}</span>
              )}
            </div>
            <button type="submit">Sign In</button>
          </form>
        )}
      </Formik>
      </div>
    </div>
  );
}

export default SignIn