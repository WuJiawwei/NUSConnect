import React, {useState} from 'react'
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI"
import logo from "../assets/logo.svg"
import "../Sass/LoginComponent.scss"
import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom"
import "../Sass/LoginComponent.scss"
import { toast } from "react-toastify"

export default function LoginComponent() {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({})
  const login = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password)
      toast.success("Signed In to NUSConnect!")
      localStorage.setItem("userEmail", res.user.email)
      navigate("/home")
    } catch (err) {
      console.log(err)
      toast.error("Please check your credentials")
    }
  }

  const googleSignIn = () => {
    let res = GoogleSignInAPI()
    navigate("/home")
  }
  return (
    <div className="login-wrapper">
      <img src={logo} width={300} />
      <div className="login-wrapper-inner">
      <h1>Sign in</h1>
      <p className="sub-heading">Welcome to NUSConnect</p>
      <div className="auth-inputs">
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
      <hr class="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton
          className="google-btn"
          onClick={googleSignIn}
        />

        <p className="go-to-signup">
          New to NUSConnect?{" "} 
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  )
}
