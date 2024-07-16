import React, {useState} from 'react'
import { LoginAPI } from "../api/AuthAPI"
import logo from "../assets/logo.svg"
import "../Sass/LoginComponent.scss"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {updateUserData, UserData} from "../UserData.js"
import {getCurrentUser} from "../api/FirestoreAPI.jsx"

export default function LoginComponent() {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({})
    const [currUser, setCurrUser] = useState({})
  const login = async () => {
    try {
        getCurrentUser(setCurrUser)
      let res = await LoginAPI(credentials.email, credentials.password)
      toast.success("Signed In to NUSConnect!")
      localStorage.setItem("userEmail", res.user.email)
        updateUserData(currUser)
        UserData.userId = currUser.userId
        console.log(UserData)
      navigate("/home")
    } catch (err) {
      console.log(err)
      toast.error("Please check your credentials")
    }
  }

  return (
    <div className="login">
      <img src={logo} width={300} />
      <div className="login-inner">
      <h1>Sign in</h1>
      <p className="welcome">Welcome to NUSConnect</p>
      <div className="inputs">
        <input
          onChange={(event) =>
            setCredentials({ ...credentials, email: event.target.value})
          }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
        />
        <input
          onChange={(event) =>
            setCredentials({ ...credentials, password: event.target.value})
          }
            type="password"
            className="common-input"
            placeholder="Enter your Password"
        />
      </div>
      <button onClick={login} className="login-btn">
        Sign in
      </button>
      </div>
      {/* <hr class="line" data-content="or" /> */}
      <div className="google-btn-wrapper">
        {/* <GoogleButton
          className="google-btn"
          onClick={googleSignIn}
        /> */}

        <p className="signup-wrapper">
          New to NUSConnect?{" "} 
          <span className="signup-link" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  )
}
