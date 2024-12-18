import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthAPI"
import logo from "../assets/logo.svg"
import "../Sass/LoginComponent.scss"
import { useNavigate } from "react-router-dom"
import "../Sass/LoginComponent.scss"
import { toast } from "react-toastify"
import { postUserData } from "../api/FirestoreAPI";

export default function RegisterComponent() {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({})
  const register = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password)
      postUserData({
        name: credentials.name, 
        email: credentials.email
      })
      navigate("/createprofile")
      localStorage.setItem("userEmail", res.user.email)
    } catch (err) {
      console.log(err)
      toast.error("Fail to create account")
    }
  }

  return (
    <div className="login">
      <img src={logo} width={300} />

      <div className="login-inner">
      <h1>Register</h1>
      <p className="welcome">Welcome to NUSConnect</p>
      <div className="inputs">
      <input
          onChange={(event) =>
            setCredentials({ ...credentials, name: event.target.value})
          }
          type = "text"
          className="common-input"
          placeholder="Your Name"
        />
        <input
          onChange={(event) =>
            setCredentials({ ...credentials, email: event.target.value})
          }
          type = "email"
          className="common-input"
          placeholder="Email or Phone"
        />
        <input
          onChange={(event) =>
            setCredentials({ ...credentials, password: event.target.value})
          }
          type = "password"
          className="common-input"
          placeholder="Password (6 or more characters)"
        />
      </div>
      <button onClick={register} className="login-btn">
        Agree & Join
      </button>
      </div>
      {/* <hr class="line" data-content="or" /> */}
      <div className="google-btn-wrapper">
        {/* <GoogleButton
          className="google-btn"
          onClick={googleSignIn}
        /> */}

        <p className="signup-wrapper">
          Already on NUSConnect?{" "} 
          <span className="signup-link" onClick={() => navigate("/")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  )
}
