import React from 'react'
import {useState} from "react";
import "./index.scss"
import projectLogo from "../../../assets/projectLogo.png"
import { FaHome, FaUsers, FaBriefcase, FaSearch, FaComments} from "react-icons/fa"
import { MdMessage} from "react-icons/md"
import { BiSolidBellRing} from "react-icons/bi"
import { RiTimerFill } from 'react-icons/ri'
import user from "../../../assets/user.png"
import { useNavigate } from 'react-router-dom'
import {getCurrentUser} from "../../../api/FirestoreAPI.jsx";
import SearchPopup from "../Popups/searchredirect.jsx";
import PostStatus from "../CreatePost/index.jsx";
import DisplayAllChats from "../DisplayAllChats/DisplayAllChats.jsx";

export default function Topbar() {
    // make top bar be the only component that calls getCurrUser function
    const [currentUser, setCurrentUser] = useState(null);
    getCurrentUser(setCurrentUser)
  let navigate = useNavigate()
  const goToRoute = (route) => {
    navigate(route)
  }

  const [mode, setMode] = useState(
      {inHomeMode : true},
      {inChatMode : false},
      {inProfileMode: false}
  )

    const [displayModalForSearch, setDisplayModalForSearch] = useState(false)

    const handleClickForHome = () => {
        mode["inHomeMode"] = true;
        mode["inChatMode"] = false;
    }

    const handleClickForChat = () => {
        mode["inHomeMode"] = false;
        mode["inChatMode"] = true;
    }

  return (
      <div>
      <div className="topbar-main">
        <img className="project-Logo" src={projectLogo} alt="projectLogo"/>
        <div className="react-icons">
          <FaSearch
              size={30}
              className="react-icon"
              onClick={() => setDisplayModalForSearch(true)}
          />
          <FaHome
              size={30}
              className="react-icon"
              onClick={handleClickForHome}
          />
            {/*<FaUsers size={30} className="react-icon"/>*/}
            {/*<RiTimerFill size={30} className="react-icon"/>*/}
            {/*<MdMessage size={30} className="react-icon"/>*/}
            {/*<BiSolidBellRing size={30} className="react-icon"/>*/}
            <FaComments
                size={30}
                className="react-icon"
                onClick = {handleClickForChat}
            />
        </div>

          <button className="profile-button"
                  onClick={() => goToRoute("/profile")}
          >
              {currentUser === null || currentUser === undefined ? <img src={user} width={40}/>
                  : <img src = {currentUser.avatar} width={40}/>}
          </button>
      </div>

          {/*This pop up can now appear on top of any page*/}
          {displayModalForSearch ?
              <SearchPopup
                  func = {() => setDisplayModalForSearch(false)}
                  current={currentUser}
              /> : <div></div>}

          {mode["inHomeMode"] ? <PostStatus currentUser={currentUser} /> : <div></div>}

          {mode["inChatMode"] ?
              <DisplayAllChats
                  currUserId={currentUser.userID}
              /> : <div></div>}
          {/*todo: how can i pass in an array of contacts. Maybe pass in the currContacts*/}
      </div>
  )
}

