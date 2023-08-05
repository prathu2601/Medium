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

  const [users,setUsers] = useState([])
  const navigate = useNavigate()

  const signin = (values)=>{
    fetch('http://localhost:3001/user/signin', {
      method: 'POST',
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
      body:JSON.stringify({
        email:values.email,
        password:values.password
      })
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      if(data.id === undefined) alert('Invalid email or password')
      else{
        localStorage.setItem('user_info',JSON.stringify(data))
        navigate(`/author/${data.id}`, {state:data})
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