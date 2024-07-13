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
import ProfileCard from "../ProfileCard/index.jsx"

export default function Topbar() {
    // make top bar be the only component that calls getCurrUser function
    const [currentUser, setCurrentUser] = useState(null);
    getCurrentUser(setCurrentUser)
  let navigate = useNavigate()
  const goToRoute = (route) => {
    navigate(route)
  }

  const [mode, setMode] = useState(
      {inSearchTutorMode : false},
      {inSearchFriendMode : false},
      {inHomeMode : true},
      {inChatMode : false},
      {inProfileMode: false}
  )

    const [displayPopupForSearch, setDisplayPopupForSearch] = useState(false)

    const handleClickForSearch = () => {
        setDisplayPopupForSearch(true)
    }

    const handleClickForHome = () => {
        // close all tabs except Home tab
        mode.isSearchTutorMode = false;
        mode.inSearchFriendMode = false;
        mode.inHomeMode = true
        mode.inChatMode = false;
        mode.inProfileMode = false;
    }

    const handleClickForChat = () => {
        // close all tabs except for chat tab
        mode.isSearchTutorMode = false;
        mode.inSearchFriendMode = false;
        mode.inHomeMode = false
        mode.inChatMode = true;
        mode.inProfileMode = false;
    }

    const handleClickForProfile = () => {
        // close all tabs except profile tab
        mode.isSearchTutorMode = false;
        mode.inSearchFriendMode = false;
        mode.inHomeMode = false
        mode.inChatMode = false;
        mode.inProfileMode = true;
    }

  return (
      <div>
      <div className="topbar-main">
        <img className="project-Logo" src={projectLogo} alt="projectLogo"/>
        <div className="react-icons">
          <FaSearch
              size={30}
              className="react-icon"
              onClick={handleClickForSearch}
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
                  onClick = {handleClickForProfile}
          >
              {currentUser === null || currentUser === undefined ? <img src={user} width={40}/>
                  : <img src = {currentUser.avatar} width={40}/>}
          </button>
      </div>
          {/*todo: Need to test if props are working well*/}
          {/*todo: pass props to search-redirect -> search -> chat -> chat-bar -> displayAllChats*/}
          {displayPopupForSearch ?
              <SearchPopup
                  func={() => setDisplayPopupForSearch(false)}/> : <div></div>}
          {mode.inHomeMode ? <PostStatus currentUser={currentUser}/> : <div></div>}
          {mode.inChatMode ? <DisplayAllChats currentUser={currentUser}/> : <div></div>}
          {mode.inProfileMode ?
              <ProfileCard
                  currentUser={{name: currentUser.name,
                               avatar: currentUser.avatar,
                                year : currentUser.year,
                               major: currentUser.major,
                               email: currentUser.email,
                               hobby: currentUser.hobby,
                               tagline: currentUser.tagline,
                               wantsToTutor: currentUser.wantsToTutor,
                               wantsToBefriend : currentUser.wantsToBefriend,
                               moduleCode: currentUser["Module Code"],
                               id : currentUser.userID
                  }
                  }
              /> :
              <div></div> }
      </div>
  )
}

