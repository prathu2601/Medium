import React, { useState } from 'react'
import './SignUp.css'
import {Formik} from 'formik'
import * as yup from 'yup'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const SignUpSchema = yup.object().shape({
  firstname: yup.string().required("Fisrtname is required"),
  lastname: yup.string().required("Lastname is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  password: yup.string()
  .min(6, "Min 6 letter password")
  .required("Password is required"),
  cpassword: yup.string().oneOf([yup.ref("password")], "Passwords do not match").required("Confirm password is required")
});

function SignUp() {

  const navigate = useNavigate()

  const [user,setUSer] = useState(localStorage.getItem('user_info')?JSON.parse(localStorage.getItem('user_info')):{})

  const createuser = (values)=>{

    const address = (user.id === undefined)?
                      'http://localhost:3001/user/signup':
                      `http://localhost:3001/user/edit/`

    fetch(address, {
      method: 'POST',
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
      body:JSON.stringify({
        id:user.id,
        firstname:values.firstname,
        lastname:values.lastname,
        email:values.email,
        password:values.password,
        bio:values.bio,
        profilepicture:values.pp_url
      })
    })
    .then((response) => response.json())
    .then((data) => {
      if(user.id === undefined && data.id === undefined) alert('Email already registered')
      else{
        localStorage.setItem('user_info',JSON.stringify(data))
        navigate(`/author/${data.id}`, {state:data})
      }
    })
    .catch((errors)=>console.log(errors))
  }

  return (
    <div className='Signup_main'>
    <Navbar/>
    <div className='Signup_sec'>
      {user.id ===undefined?
        <h2>Sign Up</h2>:
        <h2>Edit Profile</h2>
      }
      <Formik
        initialValues= {user.id ===undefined?
        {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          cpassword: "",
          bio:"",
          pp_url:"",
        }:
        {
          firstname: `${user.firstname}`,
          lastname: `${user.lastname}`,
          email: `${user.email}`,
          password: "",
          cpassword: "",
          bio:`${user.bio}`,
          pp_url:`${user.profilepicture}`,
        }
      }
        validationSchema={SignUpSchema}
        onSubmit={(values) => createuser(values)}
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
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your first name"
              />
              {touched.firstname && !!errors.firstname && (
                <span>{errors.firstname}</span>
              )}
            </div>
            <div className="input_div">
              <input
                type="text"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your last name"
              />
              {touched.lastname && !!errors.lastname && (
                <span>{errors.lastname}</span>
              )}
            </div>
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
            <div className="input_div">
              <input
                type="password"
                name="cpassword"
                value={values.cpassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="confirm password"
              />
              {touched.cpassword && !!errors.cpassword && (
                <span>{errors.cpassword}</span>
              )}
            </div>
            <div className="input_div">
              <input
                type="text"
                name="bio"
                value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Add bio"
              />
            </div>
            <div className="input_div">
              <input
                type="text"
                name="pp_url"
                value={values.pp_url}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="pp_url"
              />
            </div>
            {user.id === undefined?
              <button type="submit">Sign Up</button>:
              <button type="submit">Edit Profile</button>
            }
          </form>
        )}
      </Formik>
      </div>
    </div>
  );
}

export default SignUp