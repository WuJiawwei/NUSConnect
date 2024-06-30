import React from 'react'
import {useState} from "react";
import "./index.scss"
import projectLogo from "../../../assets/projectLogo.png"
import { FaHome, FaUsers, FaBriefcase, FaSearch, FaPowerOff} from "react-icons/fa"
import { MdMessage} from "react-icons/md"
import { BiSolidBellRing} from "react-icons/bi"
import { RiTimerFill } from 'react-icons/ri'
import { RiProfileFill } from 'react-icons/ri'
import user from "../../../assets/user.png"
import { useNavigate } from 'react-router-dom'
import PowerOff from "../Popups/PowerOff.jsx"

export default function Topbar() {
  let navigate = useNavigate()
    const [isOn, setIsOn] = useState(false)
  const goToRoute = (route) => {
    navigate(route)
  }
  return (
      <div className="topbar-main">
        <img className="project-Logo" src={projectLogo} alt="projectLogo"/>
        <div className="react-icons">
          <FaSearch
              size={30}
              className="react-icon"
              onClick={() => goToRoute("/redirectsearch")}
          />
          <FaHome
              size={30}
              className="react-icon"
              onClick={() => goToRoute("/home")}
          />
          <FaUsers size={30} className="react-icon"/>
          <RiTimerFill size={30} className="react-icon"/>
          <MdMessage size={30} className="react-icon"/>
          <BiSolidBellRing size={30} className="react-icon"/>
          <FaPowerOff
              size={30}
              className="react-icon"
              onClick = {() => setIsOn(!isOn)}
          />
        </div>

          {isOn ? <PowerOff onClose={() => setIsOn(!isOn)}/> : <div></div>}

          <button className="profile-button"
                  onClick={() => goToRoute("/profile")}
          >
              <img src={user} width={40}/>
          </button>

      </div>
  )
}
