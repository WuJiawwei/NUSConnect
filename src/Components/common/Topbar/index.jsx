import React from 'react'
import "./index.scss"
import projectLogo from "../../../assets/projectLogo.png"
import { FaHome, FaUsers, FaBriefcase, FaSearch} from "react-icons/fa"
import { MdMessage} from "react-icons/md"
import { BiSolidBellRing} from "react-icons/bi"
import user from "../../../assets/user.png"
import { useNavigate } from 'react-router-dom'

export default function Topbar() {
  let navigate = useNavigate()
  const goToRoute = (route) => {
    navigate(route)
  }
  return (
    <div className="topbar-main">
        <img className="project-Logo" src={projectLogo} alt="projectLogo" />
        <div className="react-icons">
          <FaSearch size={30} className="react-icon"/>
          <FaHome 
            size={30} 
            className="react-icon"
            onClick={() => goToRoute("/home")}
          />
          <FaUsers 
            size={30} 
            className="react-icon"
            onClick={() => goToRoute("/profile")}
            />
          <FaBriefcase size={30} className="react-icon"/>
          <MdMessage size={30} className="react-icon" />
          <BiSolidBellRing size={30} className="react-icon" />
        </div>
        <img className="user-logo" src={user} alt="user" />
    </div>
  )
}
