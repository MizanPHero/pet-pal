import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { signUp } from "../../services/users";
import './SignUp.css';

const SignUp = (props) => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    isError: false,
    errorMsg: "",
  })

  const handleChange = (event) =>
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })

  const onSignUp = async (event) => {
    event.preventDefault()
    try {
      const data = await signUp(form);

      if(!data.error){
        toast.success(`Edited Successfully!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          closeButton: false,
        });
        navigate("/signin")
      }
      
      // if (token) {
      //   navigate('/signin')
      // }
    } catch (error) {
      console.error(error)
      setForm({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        isError: true,
        errorMsg: "Sign Up Details Invalid",
      })
    }
  }

  const renderError = () => {
    const toggleForm = form.isError ? "danger" : ""
    if (form.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {form.errorMsg}
        </button>
      )
    } else {
      return <button type="submit">Sign Up</button>
    }
  }

  const { first_name, last_name, username, email, password, passwordConfirmation } = form
  return (
    <div className="sign-in-body-2">
      <div className="form-container">
        <h3>Sign Up</h3>
        <form onSubmit={onSignUp}>
          <label htmlFor="first_name">First Name</label>
          <input
            required
            type="text"
            name="first_name"
            value={first_name}
            placeholder="Enter First Name"
            onChange={handleChange}
          />
          <label htmlFor="last_name">Last Name</label>
          <input
            required
            type="text"
            name="last_name"
            value={last_name}
            placeholder="Enter Last Name"
            onChange={handleChange}
          />
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            name="username"
            value={username}
            placeholder="Enter Username"
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            value={email}
            placeholder="Enter Email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            required
            type="password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          {renderError()}
        </form>
        <div className="sign-in-text">
          Already have an Account? <Link to="/signin" className="underline">Sign In</Link>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default SignUp